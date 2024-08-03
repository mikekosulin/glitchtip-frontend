import { Injectable, computed, signal } from "@angular/core";
import { ValidAuth } from "../api/auth/auth.interfaces";
import { catchError, of, tap, throwError } from "rxjs";
import { APIState } from "../shared/shared.interfaces";
import { AuthService } from "../auth.service";
import {
  AllAuthError,
  AllAuthHttpErrorResponse,
} from "../api/allauth/allauth.interfaces";
import {
  messagesLookup,
  reduceParamErrors,
} from "../api/allauth/errorMessages";
import { handleAllAuthErrorResponse } from "../api/allauth/allauth.utils";

interface LoginState extends APIState {
  errors: AllAuthError[];
  validAuth: ValidAuth[] | null;
  useTOTP: boolean;
  authInProg: boolean;
  rememberRequest: boolean;
}

const initialState: LoginState = {
  loading: false,
  errors: [],
  validAuth: null,
  useTOTP: false,
  authInProg: false,
  rememberRequest: false,
};

@Injectable({
  providedIn: "root",
})
export class LoginService {
  state = signal(initialState);

  useTOTP$ = of(false);
  authInProg$ = of(false);
  hasFIDO2$ = of(false);
  requiresMFA$ = of(false);
  loading = computed(() => this.state().loading);
  formErrors = computed(() =>
    messagesLookup(
      this.state().errors.filter(
        (err) => err.code === "email_password_mismatch" || !err.param,
      ),
    ),
  );
  fieldErrors = computed(() =>
    reduceParamErrors(
      this.state().errors.filter(
        (err) => err.param && err.code !== "email_password_mismatch",
      ),
    ),
  );

  constructor(private authService: AuthService) {}

  login(email: string, password: string) {
    this.state.set({ ...this.state(), loading: true, errors: [] });
    return this.authService.login(email, password).pipe(
      tap(() => this.state.set(initialState)),
      catchError((err: AllAuthHttpErrorResponse) => {
        this.state.set({
          ...this.state(),
          loading: false,
          errors: handleAllAuthErrorResponse(err),
        });
        if ([400, 500].includes(err.status)) {
          return of(undefined);
        }
        return throwError(() => new Error("Unable to log in"));
      }),
    );
  }

  promptForMFA(validAuth: ValidAuth[]) {}

  switchMethod() {}

  authenticateFIDO2() {}

  toggleRemember(request = false) {}

  authenticateTOTP(code: string, remember = false) {}

  /** Create a new trusted device key, save as cookie */
  rememberDevice() {}

  authenticateBackupCode(code: string) {}
}
