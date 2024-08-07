import { Component } from "@angular/core";
import {
  Validators,
  ReactiveFormsModule,
  FormGroup,
  FormControl,
} from "@angular/forms";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { CommonModule } from "@angular/common";
import { MatCardModule } from "@angular/material/card";
import { lastValueFrom, tap } from "rxjs";
import { toObservable } from "@angular/core/rxjs-interop";
import { FormErrorComponent } from "../shared/forms/form-error/form-error.component";
import { LoginFido2Component } from "./login-fido2/login-fido2.component";
import { LoginTotpComponent } from "./login-totp/login-totp.component";
import { LoadingButtonComponent } from "../shared/loading-button/loading-button.component";
import { mapFormErrors } from "../shared/forms/form.utils";
import { StatefulComponent } from "../shared/stateful-service/signal-state.component";
import { LoginService, LoginState } from "./login.service";
import { SettingsService } from "../api/settings.service";
import { AcceptInviteService } from "../api/accept/accept-invite.service";
import { SocialApp } from "../api/user/user.interfaces";
import { AuthSvgComponent } from "../shared/auth-svg/auth-svg.component";

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
export class LoginComponent extends StatefulComponent<
  LoginState,
  LoginService
> {
  formErrors = this.service.formErrors;
  loading = this.service.loading;
  requiresMFA$ = this.service.requiresMFA$;
  hasFido2$ = this.service.hasFIDO2$;
  useTOTP$ = this.service.useTOTP$;
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
    protected service: LoginService,
    private settings: SettingsService,
    private acceptService: AcceptInviteService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    toObservable(service.fieldErrors).subscribe((fieldErrors) =>
      mapFormErrors(fieldErrors, this.form),
    );
    super(service);
  }

  get email() {
    return this.form.get("email");
  }

  get password() {
    return this.form.get("password");
  }

  onSocialApp(socialApp: SocialApp) {
    this.service.socialLogin(socialApp.provider);
  }

  onSubmit() {
    if (this.form.valid) {
      const nextUrl = this.route.snapshot.queryParamMap.get("next");
      // if (nextUrl) {
      //   this.authService.setRedirectUrl(nextUrl);
      // }
      lastValueFrom(
        this.service
          .login(this.form.value.email!, this.form.value.password!)
          .pipe(
            tap((resp) => {
              if (resp) {
                if (resp.meta.is_authenticated) {
                  if (nextUrl) {
                    if (nextUrl.startsWith("/admin/")) {
                      // Load Django, not JS router
                      window.location.href = nextUrl;
                    } else {
                      this.router.navigateByUrl(nextUrl);
                    }
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
