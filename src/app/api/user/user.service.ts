import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { BehaviorSubject, EMPTY } from "rxjs";
import { tap, map, catchError } from "rxjs/operators";
import { User } from "./user.interfaces";
import { MatSnackBar } from "@angular/material/snack-bar";

interface UserState {
  user: User | null;
}

const initialState: UserState = {
  user: null,
};

@Injectable({
  providedIn: "root",
})
export class UserService {
  private readonly state = new BehaviorSubject<UserState>(initialState);
  readonly userDetails$ = this.state.pipe(map((state) => state.user));

  readonly activeUserEmail$ = this.userDetails$.pipe(
    map((userDetails) => userDetails?.email)
  );
  private readonly url = "/api/0/users/me/";

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  /** Get and set current logged in user details from backend */
  getUserDetails() {
    this.retrieveUserDetails()
      .pipe(tap((resp: User) => this.setUserDetails(resp)))
      .subscribe();
  }
  private retrieveUserDetails() {
    return this.http.get<User>(this.url);
  }

  disconnectSocialAccount(accountId: number) {
    this.http
      .post("/api/socialaccounts/" + accountId + "/disconnect/", {})
      .pipe(
        tap(() => this.getUserDetails()),
        catchError((err: HttpErrorResponse) => {
          if (Array.isArray(err.error) && err.error.length) {
            this.snackBar.open(err.error[0]);
          }
          return EMPTY;
        })
      )
      .toPromise();
  }

  private setUserDetails(userDetails: User) {
    this.state.next({ ...this.state.getValue(), user: userDetails });
  }
}
