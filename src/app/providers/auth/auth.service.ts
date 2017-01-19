import { Injectable } from '@angular/core';
import { HttpProvider } from "../http/http.service";

@Injectable()
/**
 * Class used to manage http requests.
 * @class HttpProvider
 */
export class AuthProvider {
  constructor(
    private http: HttpProvider
  ){}

  getCsrfToken() {
      return this.http.httpRequest('auth/token', 'get');
  }

  loginUser(email: string, password: string, _token: string) {
      this.http.httpRequest('auth/login', 'post', {
        queryObj: {email, password, _token}
      }).subscribe(response => {
        console.log(response);
      });
  }

  checkLogged() {
      return this.http.httpRequest('auth/checkLogged', 'get');
  }
  logout() {
      this.http.httpRequest('auth/logout', 'get').subscribe((data) => console.log(data));
  }
}
