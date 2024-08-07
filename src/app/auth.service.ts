import { Injectable, effect, signal } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import { EMPTY, catchError, of, tap, throwError } from "rxjs";
import { AuthenticationService } from "./api/allauth/authentication.service";

const initialIsAuthenticated = localStorage.getItem("isAuthenticated");

@Injectable({
  providedIn: "root",
})
export class AuthService {
  readonly isAuthenticated = signal(
    initialIsAuthenticated ? initialIsAuthenticated === "true" : true,
  );
  //   readonly redirectUrl: WritableSignal<string | null> = signal(null);

  constructor(private authenticationService: AuthenticationService) {
    effect(() => {
      localStorage.setItem(
        "isAuthenticated",
        this.isAuthenticated().toString(),
      );
    });
  }

  checkServerAuthStatus() {
    return this.authenticationService.getAuthenticationStatus().pipe(
      tap((resp) => this.isAuthenticated.set(resp.meta.is_authenticated)),
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          this.isAuthenticated.set(false);
          return of(err);
        }
        return throwError(() => new Error("Unable to check auth status"));
      }),
    );
  }

  login(email: string, password: string) {
    return this.authenticationService
      .login(email, password)
      .pipe(
        tap((resp) => this.isAuthenticated.set(resp.meta.is_authenticated)),
      );
  }

  signup(email: string, password: string) {
    return this.authenticationService
      .signup(email, password)
      .pipe(
        tap((resp) => this.isAuthenticated.set(resp.meta.is_authenticated)),
      );
  }

  providerRedirect(
    provider: string,
    callbackUrl: string,
    process: "login" | "connect",
  ) {
    this.authenticationService.providerRedirect(provider, callbackUrl, process);
  }

  logout() {
    return this.authenticationService.logout().pipe(
      catchError((err: HttpErrorResponse) => {
        this.isAuthenticated.set(false);
        if (err.status === 401) {
          return of(EMPTY);
        }
        return throwError(() => new Error("Unable to log out"));
      }),
    );
  }
}
