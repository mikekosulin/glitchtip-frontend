import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

import { ProfileRoutingModule } from "./profile-routing.module";
import { ProfileComponent } from "./profile.component";
import { ConnectComponent } from "./connect/connect.component";
import { SharedModule } from "../shared/shared.module";
import { AuthButtonComponent } from "./auth-button/auth-button.component";
import { ChangePasswordComponent } from "./change-password/change-password.component";

@NgModule({
  declarations: [
    ProfileComponent,
    ConnectComponent,
    AuthButtonComponent,
    ChangePasswordComponent,
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ],
})
export class ProfileModule {}
