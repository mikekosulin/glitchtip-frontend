import { Component, OnInit, ViewChild } from "@angular/core";
import {
  Validators,
  FormGroupDirective,
  FormGroup,
  FormControl,
  ReactiveFormsModule,
} from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatDividerModule } from "@angular/material/divider";
import { MatCardModule } from "@angular/material/card";
import { NgIf, AsyncPipe } from "@angular/common";
import { toObservable } from "@angular/core/rxjs-interop";
import { lastValueFrom, tap } from "rxjs";
import { MatSnackBar } from "@angular/material/snack-bar";
import { PasswordService } from "./password.service";
import { UserService } from "src/app/api/user/user.service";
import { LoadingButtonComponent } from "../../shared/loading-button/loading-button.component";
import { InputMatcherDirective } from "../../shared/input-matcher.directive";
import { FormErrorComponent } from "src/app/shared/forms/form-error/form-error.component";

@Component({
  selector: "gt-change-password",
  templateUrl: "./change-password.component.html",
  styleUrls: ["./change-password.component.scss"],
  standalone: true,
  imports: [
    NgIf,
    MatCardModule,
    MatDividerModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    InputMatcherDirective,
    LoadingButtonComponent,
    MatIconModule,
    AsyncPipe,
    FormErrorComponent,
  ],
})
export class ChangePasswordComponent implements OnInit {
  @ViewChild(FormGroupDirective) formDirective?: FormGroupDirective;
  user$ = this.userService.userDetails$;
  loading = this.passwordService.loading;
  passwordResetSuccess = this.passwordService.success;
  formErrors = this.passwordService.formErrors;
  fieldErrors = this.passwordService.fieldErrors;

  form = new FormGroup({
    current_password: new FormControl("", []),
    new_password: new FormControl("", [
      Validators.required,
      Validators.minLength(8),
    ]),
    new_password2: new FormControl("", [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  get current_password() {
    return this.form.get("current_password");
  }

  get new_password() {
    return this.form.get("new_password");
  }

  get new_password2() {
    return this.form.get("new_password2");
  }

  constructor(
    private passwordService: PasswordService,
    private snackBar: MatSnackBar,
    private userService: UserService,
  ) {
    toObservable(this.passwordService.fieldErrors).subscribe((fieldErrors) => {
      Object.keys(this.form.controls).forEach((field) => {
        const control = this.form.get(field);
        if (fieldErrors[field] && control) {
          control.setErrors({ serverError: fieldErrors[field] });
        }
      });
    });
  }

  ngOnInit() {
    this.userService.getUserDetails();
  }

  onSubmit() {
    if (this.form.valid) {
      lastValueFrom(
        this.passwordService
          .changePassword(
            this.form.value.current_password!,
            this.form.value.new_password!,
          )
          .pipe(
            tap(() => {
              this.snackBar.open($localize`Your new password has been saved.`);
              this.form.reset();
              Object.keys(this.form.controls).forEach((key) => {
                this.form.get(key)!.setErrors(null);
              });
            }),
          ),
      );
    }
  }
}
