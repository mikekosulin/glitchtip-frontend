import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { combineLatest, map } from "rxjs";
import { SettingsService } from "src/app/api/settings.service";
import { MatButtonModule } from "@angular/material/button";
import { MatDividerModule } from "@angular/material/divider";
import { MatOptionModule } from "@angular/material/core";
import { MatSelectModule } from "@angular/material/select";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatCardModule } from "@angular/material/card";
import { NgIf, NgFor, AsyncPipe } from "@angular/common";
import { UserService } from "src/app/api/user/user.service";
import { AuthenticationService } from "src/app/api/allauth/authentication.service";
import { AuthSvgComponent } from "../../shared/auth-svg/auth-svg.component";

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
export class SocialAuthComponent implements OnInit {
  disconnectLoading$ = this.userService.disconnectLoading$;
  socialApps$ = this.settingsService.socialApps$;
  user$ = combineLatest([this.socialApps$, this.userService.userDetails$]).pipe(
    map(([socialApps, userDetails]) => {
      let socialAccountsWithNames = userDetails?.identities.map(
        (socialAccount) => {
          return {
            ...socialAccount,
            name: socialApps.find(
              (socialApp) => socialApp.provider === socialAccount.provider,
            )?.name,
          };
        },
      );
      return {
        ...userDetails,
        identities: socialAccountsWithNames,
      };
    }),
  );
  account = new FormControl();

  constructor(
    private userService: UserService,
    private settingsService: SettingsService,
    private authenticationService: AuthenticationService,
  ) {}

  ngOnInit(): void {
    this.userService.getUserDetails();
  }

  addAccount() {
    this.authenticationService.provider_redirect(
      this.account.value.provider,
      "connect",
    );
  }

  disconnect(id: number, account: string, provider: string) {}
}
