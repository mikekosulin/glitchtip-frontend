import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";

import { lastValueFrom } from "rxjs";
import { MultiFactorAuthService } from "./multi-factor-auth.service";
// import { Fido2Component } from "./fido2/fido2.component";
import { TOTPComponent } from "./totp/totp.component";

@Component({
  selector: "gt-multi-factor-auth",
  templateUrl: "./multi-factor-auth.component.html",
  styleUrls: ["./multi-factor-auth.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [TOTPComponent],
})
export class MultiFactorAuthComponent implements OnInit {
  initialLoadComplete = this.service.initialLoadComplete;
  constructor(private service: MultiFactorAuthService) {}

  ngOnInit() {
    lastValueFrom(this.service.getAuthenticators());
  }
}
