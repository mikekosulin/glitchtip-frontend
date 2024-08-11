import { Component, ChangeDetectionStrategy, OnInit } from "@angular/core";
import { RouterLink } from "@angular/router";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatButtonModule } from "@angular/material/button";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { FormErrorComponent } from "../../shared/forms/form-error/form-error.component";
import { LoginService } from "../login.service";

@Component({
  selector: "gt-login-fido2",
  templateUrl: "./login-fido2.component.html",
  styleUrls: ["./login-fido2.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    MatProgressBarModule,
    FormErrorComponent,
    MatButtonModule,
    MatCheckboxModule,
    RouterLink,
  ],
})
export class LoginFido2Component implements OnInit {
  useTOTP = false; //this.loginService.useTOTP;
  // error$ = this.loginService.error$;
  authInProg = false; //this.loginService.authInProg;

  constructor(private loginService: LoginService) {}

  switchMethod() {
    this.loginService.switchMethod();
  }

  ngOnInit() {
    // this.loginService.authenticateFIDO2().subscribe();
  }

  retryAuth() {
    // this.loginService.authenticateFIDO2().subscribe();
  }

  toggleRemember(event: boolean) {
    // this.loginService.toggleRemember(event);
  }
}
