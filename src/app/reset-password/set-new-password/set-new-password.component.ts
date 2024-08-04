import { Component, ChangeDetectionStrategy } from "@angular/core";
import { toObservable } from "@angular/core/rxjs-interop";
import { ActivatedRoute, RouterLink } from "@angular/router";
import {
  Validators,
  ReactiveFormsModule,
  FormGroup,
  FormControl,
} from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { NgIf } from "@angular/common";
import { MatCardModule } from "@angular/material/card";
import { lastValueFrom } from "rxjs";
import { exhaustMap, map } from "rxjs/operators";
import { LoadingButtonComponent } from "../../shared/loading-button/loading-button.component";
import { InputMatcherDirective } from "../../shared/input-matcher.directive";
import { ResetPasswordService } from "../reset-password.service";
import { mapFormErrors } from "src/app/shared/forms/form.utils";
import { FormErrorComponent } from "src/app/shared/forms/form-error/form-error.component";

@Component({
  selector: "gt-set-new-password",
  templateUrl: "./set-new-password.component.html",
  styleUrls: ["./set-new-password.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    MatCardModule,
    ReactiveFormsModule,
    NgIf,
    FormErrorComponent,
    MatFormFieldModule,
    MatInputModule,
    InputMatcherDirective,
    LoadingButtonComponent,
    RouterLink,
  ],
})
export class SetNewPasswordComponent {
  params$ = this.activatedRoute.params.pipe(
    map((params) => ({ key: params.key })),
  );
  formErrors = this.resetService.formErrors;
  success = this.resetService.success;
  loading = this.resetService.loading;
  form = new FormGroup({
    password: new FormControl("", [
      Validators.required,
      Validators.minLength(8),
    ]),
    password2: new FormControl("", [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  get password() {
    return this.form.get("password");
  }

  get password2() {
    return this.form.get("password2");
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private resetService: ResetPasswordService,
  ) {
    toObservable(this.resetService.fieldErrors).subscribe((fieldErrors) =>
      mapFormErrors(fieldErrors, this.form),
    );
  }

  onSubmit() {
    if (this.form.valid) {
      lastValueFrom(
        this.params$.pipe(
          exhaustMap((params) =>
            this.resetService.resetPassword(
              params.key,
              this.form.value.password!,
            ),
          ),
        ),
      );
    }
  }
}
