import { Component, OnInit } from "@angular/core";
import {
  Validators,
  ReactiveFormsModule,
  FormGroup,
  FormControl,
} from "@angular/forms";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { LoginService } from "./login.service";
import { GlitchTipOAuthService } from "../api/oauth/oauth.service";
import { SettingsService } from "../api/settings.service";
import { AcceptInviteService } from "../api/accept/accept-invite.service";
import { SocialApp } from "../api/user/user.interfaces";
import { AuthSvgComponent } from "../shared/auth-svg/auth-svg.component";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { FormErrorComponent } from "../shared/forms/form-error/form-error.component";
import { LoginFido2Component } from "./login-fido2/login-fido2.component";
import { LoginTotpComponent } from "./login-totp/login-totp.component";
import { CommonModule } from "@angular/common";
import { MatCardModule } from "@angular/material/card";
import { lastValueFrom, tap } from "rxjs";
import { toObservable } from "@angular/core/rxjs-interop";
import { LoadingButtonComponent } from "../shared/loading-button/loading-button.component";

@Component({
  selector: "gt-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    LoginTotpComponent,
    LoginFido2Component,
    LoadingButtonComponent,
    ReactiveFormsModule,
    FormErrorComponent,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    AuthSvgComponent,
    RouterLink,
  ],
})
export class LoginComponent implements OnInit {
  formErrors = this.loginService.formErrors;
  loading = this.loginService.loading;
  requiresMFA$ = this.loginService.requiresMFA$;
  hasFido2$ = this.loginService.hasFIDO2$;
  useTOTP$ = this.loginService.useTOTP$;
  form = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  socialApps$ = this.settings.socialApps$;
  enableUserRegistration$ = this.settings.enableUserRegistration$;
  acceptInfo$ = this.acceptService.acceptInfo$;

  constructor(
    private loginService: LoginService,
    private oauthService: GlitchTipOAuthService,
    private settings: SettingsService,
    private acceptService: AcceptInviteService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    toObservable(this.loginService.fieldErrors).subscribe((fieldErrors) => {
      Object.keys(this.form.controls).forEach((field) => {
        const control = this.form.get(field);
        if (fieldErrors[field] && control) {
          control.setErrors({ serverError: fieldErrors[field] });
        }
      });
    });
  }

  ngOnInit() {
    // this.acceptInfo$
    //   .pipe(
    //     tap((acceptInfo) => {
    //       if (acceptInfo) {
    //         this.form.patchValue({ email: acceptInfo.orgUser.email });
    //       }
    //     }),
    //   )
    //   .subscribe();
  }

  get email() {
    return this.form.get("email");
  }

  get password() {
    return this.form.get("password");
  }

  onSocialApp(socialApp: SocialApp) {
    this.oauthService.initOAuthLogin(socialApp);
  }

  onSubmit() {
    if (this.form.valid) {
      const nextUrl = this.route.snapshot.queryParamMap.get("next");
      // if (nextUrl) {
      //   this.authService.setRedirectUrl(nextUrl);
      // }
      lastValueFrom(
        this.loginService
          .login(this.form.value.email!, this.form.value.password!)
          .pipe(
            tap((resp) => {
              if (resp) {
                if (resp.meta.is_authenticated) {
                  if (nextUrl) {
                    this.router.navigateByUrl(nextUrl);
                  } else {
                    this.router.navigate(["/"]);
                  }
                }
              }
            }),
          ),
      );
    }
  }
}
