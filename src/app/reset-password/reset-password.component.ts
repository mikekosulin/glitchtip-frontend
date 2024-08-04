import { Component, ChangeDetectionStrategy } from "@angular/core";
import {
  Validators,
  FormGroup,
  FormControl,
  ReactiveFormsModule,
} from "@angular/forms";
import { RouterLink } from "@angular/router";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { NgIf, AsyncPipe } from "@angular/common";
import { MatCardModule } from "@angular/material/card";
import { toObservable } from "@angular/core/rxjs-interop";
import { lastValueFrom } from "rxjs";
import { SettingsService } from "../api/settings.service";
import { LoadingButtonComponent } from "../shared/loading-button/loading-button.component";
import { ResetPasswordService } from "./reset-password.service";
import { mapFormErrors } from "../shared/forms/form.utils";
import { FormErrorComponent } from "../shared/forms/form-error/form-error.component";

@Component({
  selector: "gt-reset-password",
  templateUrl: "./reset-password.component.html",
  styleUrls: ["./reset-password.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    MatCardModule,
    ReactiveFormsModule,
    NgIf,
    MatFormFieldModule,
    MatInputModule,
    FormErrorComponent,
    LoadingButtonComponent,
    MatButtonModule,
    RouterLink,
    AsyncPipe,
  ],
})
export class ResetPasswordComponent {
  success = this.resetService.success;
  loading = this.resetService.loading;
  formErrors = this.resetService.formErrors;
  form = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
  });
  enableUserRegistration$ = this.settings.enableUserRegistration$;

  constructor(
    private resetService: ResetPasswordService,
    private settings: SettingsService,
  ) {
    toObservable(this.resetService.fieldErrors).subscribe((fieldErrors) =>
      mapFormErrors(fieldErrors, this.form),
    );
  }

  get email() {
    return this.form.get("email");
  }

  onSubmit() {
    if (this.form.valid && this.form.value.email) {
      lastValueFrom(this.resetService.requestPassword(this.form.value.email));
    }
  }

  reset() {
    this.resetService.reset();
    this.form.reset();
    this.email!.setErrors(null);
  }
}
