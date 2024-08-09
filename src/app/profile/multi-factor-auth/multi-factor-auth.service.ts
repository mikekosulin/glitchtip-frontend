import { HttpErrorResponse } from "@angular/common/http";
import { Injectable, computed } from "@angular/core";
import { catchError, lastValueFrom, of, tap, throwError } from "rxjs";
import { AccountService } from "src/app/api/allauth/account.service";
import {
  Authenticator,
  AuthenticatorTOTPStatusNotFound,
  TOTPAuthenticator,
} from "src/app/api/allauth/allauth.interfaces";
import { SERVER_ERROR } from "src/app/constants";
import { APIState } from "src/app/shared/shared.interfaces";
import { StatefulService } from "src/app/shared/stateful-service/signal-state.service";

export interface MFAState extends APIState {
  initialLoadComplete: boolean;
  authenticators: Authenticator[];
  setupTOTPStage: number;
  tempRecoveryCodes: string[];
  error: string | null;
  copiedCodes: boolean;
  totp: {
    secret: string;
    totpUrl: string;
  } | null;
}

const initialState: MFAState = {
  initialLoadComplete: false,
  loading: false,
  authenticators: [],
  setupTOTPStage: 1,
  tempRecoveryCodes: [],
  error: null,
  copiedCodes: false,
  totp: null,
};

@Injectable({
  providedIn: "root",
})
export class MultiFactorAuthService extends StatefulService<MFAState> {
  initialLoadComplete = computed(() => this.state().initialLoadComplete);
  loading = computed(() => this.state().loading);
  setupTOTPStage = computed(() => this.state().setupTOTPStage);
  error = computed(() => this.state().error);
  copiedCodes = computed(() => this.state().copiedCodes);
  totp = computed(() => this.state().totp);
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
      lastValueFrom(this.generateRecoveryCodes());
    } else if (setupTOTPStage === 2) {
      lastValueFrom(
        this.accountService.totpAuthenticatorStatus().pipe(
          catchError((err: HttpErrorResponse) => {
            if (err.status === 404) {
              const resp = err.error as AuthenticatorTOTPStatusNotFound;
              this.setState({
                totp: { secret: resp.meta.secret, totpUrl: resp.meta.totp_url },
              });
            }
            return of(undefined);
          }),
        ),
      );
    }
    this.setState({ setupTOTPStage: setupTOTPStage + 1 });
  }

  generateRecoveryCodes() {
    return this.accountService
      .generateRecoveryCodes()
      .pipe(tap((resp) => this.setState({ tempRecoveryCodes: resp.codes })));
  }

  decrementTOTPStage() {
    this.state.update((state) => ({
      ...state,
      setupTOTPStage: state.setupTOTPStage - 1,
    }));
  }

  setCopiedCodes() {
    this.setState({ copiedCodes: true });
  }

  setRecoveryCodes(code: string) {
    this.setState({ loading: true });
    return this.accountService.setRecoveryCodes(code).pipe(
      tap(() =>
        this.state.update((state) => ({
          ...state,
          loading: false,
          setupTOTPStage: state.setupTOTPStage + 1,
        })),
      ),
      catchError((err: HttpErrorResponse) => {
        if (err.status === 400) {
          this.setState({ error: err.error.detail });
          return of(undefined);
        } else if (err.status === 500) {
          this.setState({ error: SERVER_ERROR });
          return of(undefined);
        }
        return throwError(() => err);
      }),
    );
  }
}
