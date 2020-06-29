import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { tap, withLatestFrom } from "rxjs/operators";
import { OrganizationsService } from "src/app/api/organizations/organizations.service";
import { SettingsService } from "../api/settings.service";

@Component({
  selector: "app-new-organizations",
  templateUrl: "./new-organization.component.html",
  styleUrls: ["./new-organization.component.scss"],
})
export class NewOrganizationsComponent {
  loading = false;
  error: string | undefined;
  form = new FormGroup({
    name: new FormControl("", [Validators.required]),
  });
  constructor(
    private organizationsService: OrganizationsService,
    private settingsService: SettingsService,
    private router: Router
  ) {}

  onSubmit() {
    if (this.form.valid) {
      this.loading = true;
      this.organizationsService
        .createOrganization(this.form.value.name)
        .pipe(
          withLatestFrom(this.settingsService.billingEnabled$),
          tap(([organization, billingEnabled]) => {
            if (billingEnabled) {
              this.router.navigate([
                "settings",
                organization.slug,
                "subscription",
              ]);
            } else {
              this.router.navigate(["/"]);
            }
          })
        )
        .toPromise();
    }
  }
}
