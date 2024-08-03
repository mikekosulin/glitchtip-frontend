import { Component, ChangeDetectionStrategy } from "@angular/core";
import { ActivatedRoute, RouterLink } from "@angular/router";
import {
  Validators,
  ReactiveFormsModule,
  FormGroup,
  FormControl,
} from "@angular/forms";
import { map } from "rxjs/operators";
import { LoadingButtonComponent } from "../../shared/loading-button/loading-button.component";
import { InputMatcherDirective } from "../../shared/input-matcher.directive";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { NgIf, AsyncPipe } from "@angular/common";
import { MatCardModule } from "@angular/material/card";
import { of } from "rxjs";

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
    MatFormFieldModule,
    MatInputModule,
    InputMatcherDirective,
    LoadingButtonComponent,
    RouterLink,
    AsyncPipe,
  ],
})
export class SetNewPasswordComponent {
  params$ = this.activatedRoute.params.pipe(
    map((params) => ({ uid: params.uidb64, token: params.token })),
  );
  setNewPasswordError$ = of(false);
  setnewPasswordLoading$ = of(false);
  form = new FormGroup({
    new_password1: new FormControl("", [
      Validators.required,
      Validators.minLength(8),
    ]),
    new_password2: new FormControl("", [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  get new_password1() {
    return this.form.get("new_password1");
  }

  get new_password2() {
    return this.form.get("new_password2");
  }

  constructor(private activatedRoute: ActivatedRoute) {}

  onSubmit() {
    if (this.form.valid) {
      //   this.params$
      //     .pipe(
      //       map((params) => {
      //         this.resetService.setNewPassword(
      //           this.form.value.new_password1,
      //           this.form.value.new_password2,
      //           params.uid,
      //           params.token
      //         );
      //       })
      //     )
      //     .subscribe();
      // }
    }
  }
}
