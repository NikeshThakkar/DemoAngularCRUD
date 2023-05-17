import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { SignUp } from '../shared/guard/models/signUp';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  // userSignin(userObj: UserAuth): Observable<UserAuth> {
  //   return this.httpClient.post<UserAuth>(`${environment.BASE_URL}${AUTHLOGIN}`, userObj).pipe(catchError(this.handleError));
  // }

  logout() {
    localStorage.clear();
    sessionStorage.clear();
  }

  isAuthenticated() {
    const user = sessionStorage.getItem('token');
    return !(user === null);
  }

  userSignUp(signUpObj: SignUp) {
    return this.httpClient.post<SignUp>(`/api/v1/auth/signup`, signUpObj);
  }

   userSignIn(signInObj:any) {
    return this.httpClient.post(`/api/v1/auth/login`,signInObj);
   }
}
