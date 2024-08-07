import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { catchError, lastValueFrom, of, tap, throwError } from "rxjs";
import { MatButtonModule } from "@angular/material/button";
import { MatDividerModule } from "@angular/material/divider";
import { MatOptionModule } from "@angular/material/core";
import { MatSelectModule } from "@angular/material/select";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatCardModule } from "@angular/material/card";
import { NgIf, NgFor, AsyncPipe } from "@angular/common";
import { MatSnackBar } from "@angular/material/snack-bar";
import { UserService } from "src/app/api/user/user.service";
import { AuthenticationService } from "src/app/api/allauth/authentication.service";
import { AuthSvgComponent } from "../../shared/auth-svg/auth-svg.component";
import { StatefulComponent } from "src/app/shared/stateful-service/signal-state.component";
import { SocialAuthService, SocialAuthState } from "./social-auth.service";
import { AllAuthHttpErrorResponse } from "src/app/api/allauth/allauth.interfaces";
import { UNHANDLED_ERROR } from "src/app/constants";

@Component({
  selector: "gt-social-auth",
  templateUrl: "./social-auth.component.html",
  styleUrls: ["./social-auth.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    NgIf,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    NgFor,
    MatOptionModule,
    AuthSvgComponent,
    MatDividerModule,
    MatButtonModule,
    AsyncPipe,
  ],
})
export class SocialAuthComponent
  extends StatefulComponent<SocialAuthState, SocialAuthService>
  implements OnInit
{
  socialApps$ = this.service.socialApps$;
  user$ = this.service.user$;
  disconnectLoadingId = this.service.loadingId;
  account = new FormControl();

  constructor(
    protected service: SocialAuthService,
    private userService: UserService,
    private authenticationService: AuthenticationService,
    private snackBar: MatSnackBar,
  ) {
    super(service);
  }

  ngOnInit() {
    this.userService.getUserDetails();
  }

  addAccount() {
    this.authenticationService.provider_redirect(
      this.account.value.provider,
      "connect",
      window.location.href,
    );
  }

  disconnect(id: number, provider: string, account: string) {
    lastValueFrom(
      this.service.disconnect(id, provider, account).pipe(
        tap(() => {
          this.snackBar.open(
            $localize`You have successfully disconnected your social auth account`,
          );
        }),
        catchError((err: AllAuthHttpErrorResponse) => {
          if (err.status === 400 && err.error.errors?.length) {
            this.snackBar.open(err.error.errors[0].message);
            return of(undefined);
          }
          this.snackBar.open(UNHANDLED_ERROR);
          return throwError(() => err);
        }),
      ),
    );
  }
}
