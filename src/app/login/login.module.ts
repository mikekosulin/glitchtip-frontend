import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatInputModule } from "@angular/material/input";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatPseudoCheckboxModule } from "@angular/material/core";
import { ReactiveFormsModule } from "@angular/forms";
import { LoginComponent } from "./login.component";
import { LoginRoutingModule } from "./login-routing.module";
import { AuthModule } from "../api/auth/auth.module";
import { AuthSvgComponent } from "../shared/auth-svg/auth-svg.component";
import { LoginTotpComponent } from "./login-totp/login-totp.component";
import { LoginFido2Component } from "./login-fido2/login-fido2.component";
import { FormErrorComponent } from "../shared/forms/form-error/form-error.component";
import { MaterialModule } from "../shared/material.module";

@NgModule({
  declarations: [LoginComponent, LoginTotpComponent, LoginFido2Component],
  imports: [
    CommonModule,
    LoginRoutingModule,
    ReactiveFormsModule,
    AuthModule,
    MatInputModule,
    MatProgressBarModule,
    MatPseudoCheckboxModule,
    AuthSvgComponent,
    FormErrorComponent,
    MaterialModule,
  ],
})
export class LoginModule {}
