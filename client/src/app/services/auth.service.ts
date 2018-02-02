import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthService {
  domain = "http://localhost:8080";
  authToken;
  user;
  options;

  constructor(private http: HttpClient) { }

  createAuthenticationHeaders() {
    this.options = new RequestOptions ({
      headers: new Headers({
        'Content-Type': 'application/json',
        'authorization': this.authToken
      })
    });
  }

  checkUsername(value) {
    return this.http.get(this.domain + '/authentication/checkusername/' + value)
      .map((res) => res);
  }

  registerUser(user) {
    console.log('register service call', user)
    // let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    // let options = new RequestOptions({ headers: headers }); // Create a request option
    return this.http.post(this.domain + '/authentication/register', user)
      .map((res) => res).catch(this.handleError);
  }  

  private handleError(error: Response) {
      return Observable.throw(error.statusText);
  }

  login(user) {
    console.log('login service call', user)
    return this.http.post(this.domain + '/authentication/login', user)
      .map((res) => res).catch(this.handleError);
  }

  updateUser(user) {
    return this.http.post(this.domain + '/authentication/update', user)
      .map((res) => res).catch(this.handleError);
  }

  getUser() {
    this.createAuthenticationHeaders();
    return this.http.get(this.domain + '/authentication/getuser', this.options)
      .map((res)=> res);
  }

  storeUserData(token, user) {
    localStorage.setItem('token', token); // Set token in local storage
    localStorage.setItem('user', JSON.stringify(user)); // Set user in local storage as string
    this.authToken = token; // Assign token to be used elsewhere
    this.user = user; // Set user to be used elsewhere
  }


  logout() {
    this.authToken = null; // Set token to null
    this.user = null; // Set user to null
    localStorage.clear(); // Clear local storage
  }
}
