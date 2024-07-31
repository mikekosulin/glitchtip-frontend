import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { allauthBase } from "src/app/constants";

interface ChangePassword {
  old_password: string;
  new_password1: string;
  new_password2: string;
}

const url = allauthBase + "/account/password/change";

@Injectable({
  providedIn: "root",
})
export class PasswordService {
  constructor(private http: HttpClient) {}

  changePassword(
    // tslint:disable: variable-name
    old_password: string,
    new_password1: string,
    new_password2: string,
  ) {
    const data: ChangePassword = {
      old_password,
      new_password1,
      new_password2,
    };
    return this.http.post(url, data);
  }
}
