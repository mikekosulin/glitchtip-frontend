import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { StatefulService } from "../shared/stateful-service/stateful-service";
import { AuthService } from "../api/auth/auth.service";
import { catchError, map, tap } from "rxjs/operators";
import { ServerError } from "../shared/django.interfaces";
import { EMPTY } from "rxjs";

const baseUrl = "/rest-auth";

type ValidAuth = "TOTP" | "FIDO2";

interface LoginResponse {
  requires_mfa: boolean;
  valid_auth: ValidAuth[];
}

interface LoginState {
  loading: boolean;
  error: ServerError | null;
  validAuth: ValidAuth[] | null;
}

const initialState: LoginState = {
  loading: false,
  error: null,
  validAuth: null,
};

@Injectable({
  providedIn: "root",
})
export class LoginService extends StatefulService<LoginState> {
  loading$ = this.getState$.pipe(map((state) => state.loading));
  error$ = this.getState$.pipe(map((state) => state.error));
  requiresMFA$ = this.getState$.pipe(map((state) => !!state.validAuth));
  hasFIDO2$ = this.getState$.pipe(
    map((state) => state.validAuth?.includes("FIDO2"))
  );
  hasTOTP$ = this.getState$.pipe(
    map((state) => state.validAuth?.includes("TOTP"))
  );
  constructor(private http: HttpClient, private authService: AuthService) {
    super(initialState);
  }

  login(email: string, password: string) {
    const url = baseUrl + "/login/";
    const data = {
      email,
      password,
    };
    this.setState({ loading: true, error: null });
    return this.http.post<LoginResponse>(url, data).pipe(
      tap((resp) => {
        if (resp.requires_mfa) {
          this.setState({ validAuth: resp.valid_auth });
        } else {
          this.authService.afterLogin();
        }
      }),
      catchError((err) => {
        let error: ServerError | null = null;
        if (err.status === 400) {
          error = err.error;
        } else {
          error = { non_field_errors: ["Error"] };
        }
        this.setState({ loading: false, error });
        return EMPTY;
      })
    );
  }

  authenticateTOTP(code: string) {
    const url = "/api/mfa/authenticate/totp/";
    const data = {
      otp: code,
    };
    this.setState({ loading: true, error: null });
    return this.http.post(url, data).pipe(
      tap(() => {
        this.clearState();
        this.authService.afterLogin();
      }),
      catchError((err) => {
        let error: ServerError | null = null;
        if (err.status === 400) {
          error = { non_field_errors: err.error };
        } else {
          error = { non_field_errors: ["Error"] };
        }
        this.setState({ loading: false, error });
        return EMPTY;
      })
    );
  }

  authenticateBackupCode(code: string) {
    const url = "/api/mfa/authenticate/backup_codes/";
    const data = {
      code: code,
    };
    this.setState({ loading: true, error: null });
    return this.http.post(url, data).pipe(
      tap(() => {
        this.clearState();
        this.authService.afterLogin();
      }),
      catchError((err) => {
        let error: ServerError | null = null;
        if (err.status === 400) {
          if (err.error.code) {
            error = err.error;
            console.log(error);
          } else {
            error = { non_field_errors: err.error };
          }
        } else {
          error = { non_field_errors: ["Error"] };
        }
        this.setState({ loading: false, error });
        return EMPTY;
      })
    );
  }
}
