import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class AuthService {
  domain = "http://localhost:8080";

  constructor(private http: HttpClient) { }

  checkUsername(value) {
    return this.http.get(this.domain + '/authentication/checkusername/' + value)
      .map((res) => res);
  }

  registerUser(user) {
    // let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    // let options = new RequestOptions({ headers: headers }); // Create a request option
    return this.http.post(this.domain + '/authentication/register', user)
      .map((res) => res).catch(this.handleError);
  }  

  private handleError(error: Response) {
      return Observable.throw(error.statusText);
  }
}
