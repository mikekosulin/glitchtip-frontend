import { ChangeDetectionStrategy, Component } from "@angular/core";
import { AsyncPipe, NgIf, NgFor, KeyValuePipe } from "@angular/common";
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardTitle,
} from "@angular/material/card";
import { SettingsService } from "../api/settings.service";
import { MatDivider } from "@angular/material/divider";
import { MatHint } from "@angular/material/form-field";
import { map, combineLatest } from "rxjs";
import { EntryDataComponent } from "../shared/entry-data/entry-data.component";

@Component({
  selector: "gt-system-info",
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
    MatHint,
    EntryDataComponent,
    KeyValuePipe,
  ],
  templateUrl: "./system-info.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SystemInfoComponent {
  initialLoad$ = this.settingsService.initialLoad$;
  backendConfiguration$ = combineLatest([
    this.settingsService.enableOrganizationCreation$,
    this.settingsService.enableUserRegistration$,
    this.settingsService.paidForGlitchTip$,
    this.settingsService.serverTimeZone$,
    this.settingsService.version$,
  ]).pipe(
    map(
      ([
        enableOrganizationCreation,
        enableUserRegistration,
        paidForGlitchTip,
        serverTimeZone,
        version,
      ]) => {
        return {
          enableOrganizationCreation,
          enableUserRegistration,
          paidForGlitchTip,
          serverTimeZone,
          version,
        };
      },
    ),
  );

  constructor(private settingsService: SettingsService) {}
}
