import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { allauthBase } from "src/app/constants";
import {
  AllAuthProvidersResponse,
  AllAuthSessionResponse,
} from "./allauth.interfaces";

const baseUrl = allauthBase + "/account";

@Injectable({
  providedIn: "root",
})
export class AccountService {
  constructor(private http: HttpClient) {}

  changePassword(current_password: string, new_password: string) {
    return this.http.post<AllAuthSessionResponse>(
      baseUrl + "/password/change",
      {
        current_password,
        new_password,
      },
    );
  }

  getProviders() {
    return this.http.get<AllAuthProvidersResponse>(baseUrl + "/providers");
  }

  disconnectProvider(provider: string, account: string) {
    return this.http.delete<AllAuthProvidersResponse>(baseUrl + "/providers", {
      body: {
        provider,
        account,
      },
    });
  }
}
