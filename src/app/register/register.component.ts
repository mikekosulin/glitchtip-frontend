import { Component, OnInit } from "@angular/core";
import {
  Validators,
  ReactiveFormsModule,
  FormGroup,
  FormControl,
} from "@angular/forms";
import { Router, ActivatedRoute, RouterLink } from "@angular/router";
import { tap } from "rxjs/operators";
import { AuthSvgComponent } from "../shared/auth-svg/auth-svg.component";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { CommonModule } from "@angular/common";
import { MatCardModule } from "@angular/material/card";
import { lastValueFrom } from "rxjs";
import { toObservable } from "@angular/core/rxjs-interop";
import { InputMatcherDirective } from "../shared/input-matcher.directive";
import { RegisterService } from "./register.service";
import { AcceptInviteService } from "../api/accept/accept-invite.service";
import { SettingsService } from "../api/settings.service";
import { SocialApp } from "../api/user/user.interfaces";
import { GlitchTipOAuthService } from "../api/oauth/oauth.service";
import { getUTM, setStorageWithExpiry } from "../shared/shared.utils";
import { FormErrorComponent } from "../shared/forms/form-error/form-error.component";

@Component({
  selector: "gt-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    FormErrorComponent,
    InputMatcherDirective,
    MatButtonModule,
    AuthSvgComponent,
    RouterLink,
  ],
})
export class RegisterComponent implements OnInit {
  tags = "";
  socialApps$ = this.settings.socialApps$;
  form = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password1: new FormControl("", [
      Validators.required,
      Validators.minLength(8),
    ]),
    password2: new FormControl("", [
      Validators.required,
      Validators.minLength(8),
    ]),
  });
  formErrors = this.registerService.formErrors;
  acceptInfo$ = this.acceptService.acceptInfo$;

  constructor(
    private registerService: RegisterService,
    private router: Router,
    private route: ActivatedRoute,
    private acceptService: AcceptInviteService,
    private settings: SettingsService,
    private oauthService: GlitchTipOAuthService,
  ) {
    toObservable(this.registerService.fieldErrors).subscribe((fieldErrors) => {
      Object.keys(this.form.controls).forEach((field) => {
        const control = this.form.get(field);
        if (fieldErrors[field] && control) {
          control.setErrors({ serverError: fieldErrors[field] });
        }
      });
    });
  }

  ngOnInit() {
    this.tags = getUTM().toString();

    this.acceptInfo$
      .pipe(
        tap((acceptInfo) => {
          if (acceptInfo) {
            this.form.patchValue({ email: acceptInfo.orgUser.email });
          }
        }),
      )
      .subscribe();
  }

  get email() {
    return this.form.get("email");
  }

  get password1() {
    return this.form.get("password1");
  }

  get password2() {
    return this.form.get("password2");
  }

  onSubmit() {
    if (this.form.valid) {
      const nextUrl = this.route.snapshot.queryParamMap.get("next");
      lastValueFrom(
        this.registerService
          .register(this.form.value.email!, this.form.value.password1!)
          .pipe(
            tap((resp) => {
              if (resp?.meta.is_authenticated) {
                if (nextUrl) {
                  this.router.navigateByUrl(nextUrl);
                } else {
                  this.router.navigate(["organizations", "new"]);
                }
              }
            }),
          ),
      );
    }
  }

  onSocialApp(socialApp: SocialApp) {
    const utm = getUTM().toString();
    if (utm) {
      setStorageWithExpiry("register", utm, 5 * 60 * 1000);
    }

    this.oauthService.initOAuthLogin(socialApp);
  }
}
