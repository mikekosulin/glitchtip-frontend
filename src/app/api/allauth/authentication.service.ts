import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { allauthBase } from "src/app/constants";
import {
  AllAuthGetEmailVerificationResponse,
  AllAuthResponse,
  AllAuthSessionResponse,
} from "./allauth.interfaces";
import { catchError, Observable, of, throwError } from "rxjs";

const baseUrl = allauthBase + "/auth";

@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  constructor(private http: HttpClient) {}

  getAuthenticationStatus() {
    return this.http.get<AllAuthSessionResponse>(baseUrl + "/session");
  }

  logout() {
    return this.http.delete<AllAuthSessionResponse>(baseUrl + "/session");
  }

  login(email: string, password: string) {
    return this.http.post<AllAuthSessionResponse>(baseUrl + "/login", {
      email,
      password,
    });
  }

  signup(email: string, password: string) {
    return this.http.post<AllAuthSessionResponse>(baseUrl + "/signup", {
      email,
      password,
    });
  }

  getEmailVerificationInformation(key: string) {
    return this.http.get<AllAuthGetEmailVerificationResponse>(
      baseUrl + "/email/verify",
      {
        headers: {
          "X-Email-Verification-Key": key,
        },
      },
    );
  }

  verifyEmail(key: string) {
    return this.http.post<AllAuthSessionResponse>(baseUrl + "/email/verify", {
      key,
    });
  }

  reauthenticate(password: string) {
    return this.http.post<AllAuthSessionResponse>(baseUrl + "/reauthenticate", {
      password,
    });
  }

  requestPassword(email: string) {
    return this.http.post<AllAuthResponse>(baseUrl + "/password/request", {
      email,
    });
  }

  resetPassword(
    key: string,
    password: string,
  ): Observable<AllAuthSessionResponse> {
    return this.http
      .post<AllAuthSessionResponse>(baseUrl + "/password/reset", {
        key,
        password,
      })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          // 401 is the normal response when ACCOUNT_LOGIN_ON_PASSWORD_RESET is false
          if (error.status === 401) {
            return of(error.error);
          }
          return throwError(() => error);
        }),
      );
  }
}
