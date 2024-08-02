import { Injectable, computed, signal } from "@angular/core";
import { catchError, of, tap, throwError } from "rxjs";
import { AuthService } from "../auth.service";
import { APIState } from "../shared/shared.interfaces";
import {
  AllAuth400ErrorResponse,
  AllAuthError,
  AllAuthHttpErrorResponse,
} from "../api/allauth/allauth.interfaces";
import {
  messagesLookup,
  reduceParamErrors,
} from "../api/allauth/errorMessages";
import { ALLAUTH_SERVER_ERROR } from "../constants";

interface RegisterState extends APIState {
  errors: AllAuthError[];
}

const initialState: RegisterState = {
  loading: false,
  errors: [],
};

@Injectable({
  providedIn: "root",
})
export class RegisterService {
  state = signal(initialState);
  formErrors = computed(() => messagesLookup(this.state().errors));
  fieldErrors = computed(() =>
    reduceParamErrors(this.state().errors.filter((err) => err.param)),
  );
  constructor(private authService: AuthService) {}

  register(email: string, password: string) {
    this.state.set({ ...this.state(), loading: true, errors: [] });
    this.authService.signup(email, password);
    return this.authService.signup(email, password).pipe(
      tap(() => this.state.set(initialState)),
      catchError((err: AllAuthHttpErrorResponse) => {
        if (err.status === 400) {
          const errResponse = err.error as AllAuth400ErrorResponse;
          this.state.set({
            ...this.state(),
            errors: errResponse.errors,
          });
          return of(undefined);
        } else if (err.status === 500) {
          this.state.set({
            ...this.state(),
            errors: ALLAUTH_SERVER_ERROR,
          });
        }
        return throwError(() => new Error("Unable to signup"));
      }),
    );
  }
}
