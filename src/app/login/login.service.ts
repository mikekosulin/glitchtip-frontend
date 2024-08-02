import { Injectable, computed, signal } from "@angular/core";
import { ValidAuth } from "../api/auth/auth.interfaces";
import { catchError, of, tap, throwError } from "rxjs";
import { APIState } from "../shared/shared.interfaces";
import { AuthService } from "../auth.service";
import {
  AllAuth400ErrorResponse,
  AllAuthHttpErrorResponse,
} from "../api/allauth/allauth.interfaces";

interface LoginState extends APIState {
  errors: string[] | null;
  validAuth: ValidAuth[] | null;
  useTOTP: boolean;
  authInProg: boolean;
  rememberRequest: boolean;
}

const initialState: LoginState = {
  loading: false,
  errors: null,
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
  loading$ = of(false);
  error$: any = of({});
  errors = computed(() => this.state().errors);

  constructor(private authService: AuthService) {}

  login(email: string, password: string) {
    this.state.set({ ...this.state(), loading: true, errors: null });
    return this.authService.login(email, password).pipe(
      tap(() => this.state.set(initialState)),
      catchError((err: AllAuthHttpErrorResponse) => {
        if (err.status === 400) {
          const errResponse = err.error as AllAuth400ErrorResponse;
          console.log("set it ");
          this.state.set({
            ...this.state(),
            errors: [errResponse.errors[0].message],
          });
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
