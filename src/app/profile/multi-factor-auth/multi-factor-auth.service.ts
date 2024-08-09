import { Injectable, computed } from "@angular/core";
import { tap } from "rxjs";
import { AccountService } from "src/app/api/allauth/account.service";
import {
  Authenticator,
  TOTPAuthenticator,
} from "src/app/api/allauth/allauth.interfaces";
import { APIState } from "src/app/shared/shared.interfaces";
import { StatefulService } from "src/app/shared/stateful-service/signal-state.service";

export interface MFAState extends APIState {
  initialLoadComplete: boolean;
  authenticators: Authenticator[];
  setupTOTPStage: number;
  tempRecoveryCodes: string[];
}

const initialState: MFAState = {
  initialLoadComplete: false,
  loading: false,
  authenticators: [],
  setupTOTPStage: 1,
  tempRecoveryCodes: [],
};

@Injectable({
  providedIn: "root",
})
export class MultiFactorAuthService extends StatefulService<MFAState> {
  initialLoadComplete = computed(() => this.state().initialLoadComplete);
  loading = computed(() => this.state().loading);
  setupTOTPStage = computed(() => this.state().setupTOTPStage);
  TOTPAuthenticator = computed(
    () =>
      this.state().authenticators.filter((auth) => auth.type === "totp")[0] as
        | TOTPAuthenticator
        | undefined,
  );
  codes = computed(() => this.state().tempRecoveryCodes);
  constructor(private accountService: AccountService) {
    super(initialState);
  }

  getAuthenticators() {
    this.setState({ loading: true });
    return this.accountService.listAuthenticators().pipe(
      tap((resp) => {
        this.setState({
          loading: false,
          initialLoadComplete: true,
          authenticators: resp.data,
        });
      }),
    );
  }

  incrementTOTPStage() {
    const setupTOTPStage = this.setupTOTPStage();
    if (setupTOTPStage === 1) {
      this.accountService
        .generateRecoveryCodes()
        .pipe(tap((resp) => this.setState({ tempRecoveryCodes: resp.codes })));
    }
    this.setState({ setupTOTPStage: setupTOTPStage + 1 });
  }

  decrementTOTPStage() {
    this.state.update((state) => ({
      ...state,
      setupTOTPStage: state.setupTOTPStage - 1,
    }));
  }
}
//   initialLoad$ = this.getState$.pipe(map((state) => state.initialLoad));
//   userKeys$ = this.getState$.pipe(map((state) => state.userKeys));
//   TOTPKey$ = this.userKeys$.pipe(
//     map((userKeys) => userKeys.find((key) => key.key_type === "TOTP"))
//   );
//   FIDO2Keys$ = this.userKeys$.pipe(
//     map((keys) => keys.filter((key) => key.key_type === "FIDO2"))
//   );
//   setupTOTPStage$ = this.getState$.pipe(map((state) => state.setupTOTPStage));
//   totp$ = this.getState$.pipe(map((state) => state.TOTPResponse));
//   serverError$ = this.getState$.pipe(map((state) => state.serverError));
//   backupCodes$ = this.getState$.pipe(map((state) => state.backupCodes));
//   copiedCodes$ = this.getState$.pipe(
//     map((state) => state.backupCodes !== null && state.copiedCodes)
//   );
//   enteredCodeSuccess$ = this.getState$.pipe(
//     map((state) => state.copiedCodes && state.enteredCode)
//   );
//   regenCodes$ = this.getState$.pipe(map((state) => state.regenCodes));
//   setupFIDO2Stage$ = this.getState$.pipe(map((state) => state.setupFIDO2Stage));

//   constructor(private api: UserKeysService, private snackBar: MatSnackBar) {
//     super(initialState);
//   }

//   getUserKeys() {
//     return this.api
//       .list()
//       .pipe(tap((userKeys) => this.setState({ userKeys, initialLoad: true })));
//   }

//   // Will need to rework snackbar messaging when FIDO2 is added.
//   deleteKey(keyId: number, keyType: string) {
//     return this.api.destroy(keyId.toString()).pipe(
//       exhaustMap(() => this.getUserKeys()),
//       tap(() => {
//         if (keyType === "TOTP") {
//           this.snackBar.open("TOTP authentication deactivated.");
//         } else {
//           this.snackBar.open("Security key removed.");
//         }
//       })
//     );
//   }

//   incrementTOTPStage() {
//     const setupTOTPStage = this.state.getValue().setupTOTPStage;
//     if (setupTOTPStage === 1) {
//       this.getTOTP().subscribe();
//       this.getBackupCodes().subscribe();
//     }
//     this.setState({ setupTOTPStage: setupTOTPStage + 1 });
//   }

//   decrementTOTPStage() {
//     const setupTOTPStage = this.state.getValue().setupTOTPStage;
//     this.setState({ setupTOTPStage: setupTOTPStage - 1 });
//   }

//   enableTOTP(code: string) {
//     const state = this.state.getValue();
//     this.setState({ serverError: {} });
//     if (state.TOTPResponse) {
//       return this.api
//         .totpCreate({
//           answer: code,
//           secret_key: state.TOTPResponse.secret_key,
//         })
//         .pipe(
//           tap(() => {
//             this.clearState();
//             this.getUserKeys().subscribe();
//           }),
//           catchError((err) => {
//             if (err instanceof HttpErrorResponse) {
//               if (err.error) {
//                 this.setState({ serverError: err.error });
//               }
//             }
//             return EMPTY;
//           })
//         );
//     }
//     return EMPTY;
//   }

//   getTOTP() {
//     return this.api
//       .totp()
//       .pipe(tap((resp) => this.setState({ TOTPResponse: resp })));
//   }

//   getBackupCodes() {
//     return this.api.backupCodes().pipe(
//       tap((resp) =>
//         this.setState({
//           backupCodes: resp.codes,
//           copiedCodes: false,
//           enteredCode: false,
//         })
//       )
//     );
//   }

//   setCopiedCodes() {
//     this.setState({ copiedCodes: true });
//   }

//   setRegenCodes() {
//     this.setState({ regenCodes: true });
//     this.getBackupCodes().subscribe();
//   }

//   verifyBackupCode(code: string) {
//     const state = this.state.getValue();
//     if (state.backupCodes !== null && state.backupCodes.includes(code)) {
//       return this.api
//         .backupCodesCreate({
//           name: "Backup Codes",
//           codes: state.backupCodes,
//         })
//         .pipe(
//           tap(() => {
//             if (state.regenCodes) {
//               this.snackBar.open("Your new backup codes are now active.");
//               this.setState({
//                 regenCodes: false,
//                 backupCodes: null,
//                 serverError: {},
//               });
//             } else {
//               this.setState({
//                 setupTOTPStage: state.setupTOTPStage + 1,
//                 backupCodes: null,
//                 serverError: {},
//               });
//             }
//           })
//         );
//     } else {
//       this.setState({ serverError: { non_field_errors: ["Invalid code"] } });
//     }
//     return EMPTY;
//   }

//   activateFido2() {
//     this.setState({ serverError: {} });
//     this.setState({ setupFIDO2Stage: 1 });
//     return this.api.fido2().pipe(
//       exhaustMap(async (options) => {
//         return await navigator.credentials.create(options);
//       }),
//       map((credResult) => {
//         if (credResult === null) {
//           return throwError;
//         } else {
//           this.setState({ credential: credResult as PublicKeyCredential });
//           this.setState({ setupFIDO2Stage: 2 });
//           return EMPTY;
//         }
//       }),
//       catchError((err) => {
//         console.warn(err);
//         this.setState({
//           serverError: {
//             non_field_errors: ["Device activation was unsuccessful."],
//           },
//         });
//         this.setState({ setupFIDO2Stage: 0 });
//         return EMPTY;
//       })
//     );
//   }

//   registerFido2(name: string) {
//     const state = this.state.getValue();
//     if (state.credential) {
//       const attestationResponse = state.credential
//         .response as AuthenticatorAttestationResponse;
//       return this.api.fido2Create(attestationResponse, name).pipe(
//         tap(() => {
//           this.clearState();
//           this.snackBar.open("Your security key has been registered.");
//           this.getUserKeys().subscribe();
//         })
//       );
//     }
//     return EMPTY;
//   }
// }
