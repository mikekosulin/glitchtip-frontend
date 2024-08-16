import { inject } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  createUrlTreeFromSnapshot,
} from "@angular/router";
import { AuthService } from "../auth.service";

export const alreadyLoggedInGuard = (next: ActivatedRouteSnapshot) =>
  inject(AuthService).isAuthenticated()
    ? createUrlTreeFromSnapshot(next, ["/"])
    : true;
