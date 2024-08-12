import { Component, ChangeDetectionStrategy } from "@angular/core";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatDividerModule } from "@angular/material/divider";
import { MatCardModule } from "@angular/material/card";
import { LoadingButtonComponent } from "../../../shared/loading-button/loading-button.component";
import { FormErrorComponent } from "../../../shared/forms/form-error/form-error.component";
import { MultiFactorAuthService } from "../multi-factor-auth.service";
import { lastValueFrom } from "rxjs";

@Component({
  selector: "gt-webauthn",
  templateUrl: "./webauthn.component.html",
  styleUrls: ["./webauthn.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    MatCardModule,
    MatDividerModule,
    FormErrorComponent,
    LoadingButtonComponent,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTooltipModule,
    MatIconModule,
  ],
})
export class WebauthnComponent {
  stage = this.service.webauthnState;
  authenticators = [];
  hasTOTP = this.service.TOTPAuthenticator;
  error = null;
  // tooltipDisabled = false;
  // TOTPKey$ = this.service.TOTPKey$;
  // FIDO2Keys$ = this.service.FIDO2Keys$;
  // setupFIDO2Stage$ = this.service.setupFIDO2Stage$;
  // error$ = this.service.serverError$;
  form = new FormGroup({
    code: new FormControl("", [Validators.required]),
  });
  constructor(private service: MultiFactorAuthService) {}
  // get fido2Code() {
  //   return this.fido2Form.get("fido2Code");
  // }
  activateWebauthn() {
    lastValueFrom(this.service.getWebauthn());
  }
  // registerFido2() {
  //   const name = this.fido2Form.get("fido2Code")?.value;
  //   if (this.fido2Form.valid && name) {
  //     this.service.registerFido2(name).subscribe();
  //     return EMPTY;
  //   } else {
  //     return EMPTY;
  //   }
  // }
  // deleteFido2Key(keyId: number) {
  //   this.service.deleteKey(keyId, "FIDO2").subscribe();
  // }
  // formatDate(lastUsed: string) {
  //   if (lastUsed) {
  //     const date = new Date(lastUsed);
  //     return date.toLocaleDateString();
  //   } else {
  //     return "Not yet used";
  //   }
  // }
  // checkIfTooltipIsNecessary($event: Event) {
  //   this.tooltipDisabled = checkForOverflow($event);
  // }
}
