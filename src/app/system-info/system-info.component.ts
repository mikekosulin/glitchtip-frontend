import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AsyncPipe, NgIf, NgFor } from "@angular/common";
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from "@angular/material/card";
import { SettingsService } from "../api/settings.service";
import { MatDivider } from "@angular/material/divider";
import { MatHint } from "@angular/material/form-field";
import { OrganizationsService } from "../api/organizations/organizations.service";

@Component({
  selector: 'gt-system-info',
  standalone: true,
  imports: [
    AsyncPipe,
    NgIf,
    NgFor,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    MatDivider,
    MatHint
  ],
  templateUrl: './system-info.component.html',
  styleUrl: './system-info.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SystemInfoComponent implements OnInit {
  paidForGlitchTip$ = this.settingsService.paidForGlitchTip$;
  socialApps$ = this.settingsService.socialApps$;
  version$ = this.settingsService.version$;
  initialLoad$ = this.settingsService.initialLoad$;
  serverTimeZone$ = this.settingsService.serverTimeZone$;
  enableOrganizationCreation$ = this.settingsService.enableOrganizationCreation$;
  enableUserRegistration$ = this.settingsService.enableUserRegistration$;
  stripePublicKey$ = this.settingsService.stripePublicKey$;
  billingEnabled$ = this.settingsService.billingEnabled$;
  organizations$  = this.organizationsService.organizations$;

  constructor(
    private settingsService: SettingsService,
    private organizationsService: OrganizationsService,
  ) {}

  ngOnInit() {
    console.log(this.settingsService, 'settingsService');
  }

}
