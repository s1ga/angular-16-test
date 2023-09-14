import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, map } from "rxjs";
import { GithubUser, GithubUserDetails, GithubUserResponse } from "src/app/shared/model";

@Injectable({ providedIn: 'root' })
export default class GithubUsersService {
  constructor(private http: HttpClient) { }

  public searchUsers(query: string): Observable<GithubUser[]> {
    return this.http.get<GithubUserResponse>(`https://api.github.com/search/users?q=${query}`).pipe(
      map((res: GithubUserResponse) => res.items),
    );
  }

  public searchUserDetails(username: string): Observable<GithubUserDetails> {
    return this.http.get<GithubUserDetails>(`https://api.github.com/users/${username}`);
  }
}