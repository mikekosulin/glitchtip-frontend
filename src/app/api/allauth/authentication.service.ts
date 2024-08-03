import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { allauthBase } from "src/app/constants";
import {
  AllAuthGetEmailVerificationResponse,
  AllAuthResponse,
  AllAuthSessionResponse,
} from "./allauth.interfaces";

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
}
