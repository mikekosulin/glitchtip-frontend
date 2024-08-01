import { Injectable, signal } from "@angular/core";
import { ValidAuth } from "../api/auth/auth.interfaces";
import { AuthenticationService } from "../api/allauth/authentication.service";
import { of, tap } from "rxjs";
import { APIState } from "../shared/shared.interfaces";

interface LoginState extends APIState {
  validAuth: ValidAuth[] | null;
  useTOTP: boolean;
  authInProg: boolean;
  rememberRequest: boolean;
}

const initialState: LoginState = {
  loading: false,
  error: null,
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

  constructor(private authenticationService: AuthenticationService) {}

  login(email: string, password: string) {
    this.state.set({ ...this.state(), loading: true, error: null });
    return this.authenticationService
      .login(email, password)
      .pipe(tap((resp) => this.state.set(initialState)));
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
