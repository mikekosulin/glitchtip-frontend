import { Injectable, computed, signal } from "@angular/core";
import { catchError, of, tap, throwError } from "rxjs";
import {
  AllAuthError,
  AllAuthHttpErrorResponse,
} from "../api/allauth/allauth.interfaces";
import { APIState } from "../shared/shared.interfaces";
import { AuthenticationService } from "../api/allauth/authentication.service";
import { handleAllAuthErrorResponse } from "../api/allauth/allauth.utils";
import {
  messagesLookup,
  reduceParamErrors,
} from "../api/allauth/errorMessages";

interface ResetPasswordState extends APIState {
  errors: AllAuthError[];
  success: boolean;
}

const initialState: ResetPasswordState = {
  loading: false,
  success: false,
  errors: [],
};

@Injectable({
  providedIn: "root",
})
export class ResetPasswordService {
  state = signal(initialState);
  loading = computed(() => this.state().loading);
  success = computed(() => this.state().success);
  formErrors = computed(() =>
    messagesLookup(this.state().errors.filter((err) => !err.param)),
  );
  fieldErrors = computed(() =>
    reduceParamErrors(this.state().errors.filter((err) => err.param)),
  );

  constructor(private authenticationService: AuthenticationService) {}

  reset() {
    this.state.set(initialState);
  }

  requestPassword(email: string) {
    this.state.set({ ...initialState, loading: true });
    return this.authenticationService.requestPassword(email).pipe(
      tap(() => this.state.set({ ...initialState, success: true })),
      catchError((err: AllAuthHttpErrorResponse) => {
        this.state.set({
          ...this.state(),
          loading: false,
          errors: handleAllAuthErrorResponse(err),
        });
        if ([400, 500].includes(err.status)) {
          return of(undefined);
        }
        return throwError(() => new Error("Unable to request password"));
      }),
    );
  }

  resetPassword(key: string, password: string) {
    this.state.set({ ...initialState, loading: true });
    return this.authenticationService.resetPassword(key, password).pipe(
      catchError((err: AllAuthHttpErrorResponse) => {
        this.state.set({
          ...this.state(),
          loading: false,
          errors: handleAllAuthErrorResponse(err),
        });
        if ([400, 500].includes(err.status)) {
          return of(undefined);
        }
        return throwError(() => new Error("Unable to reset password"));
      }),
    );
  }
}
