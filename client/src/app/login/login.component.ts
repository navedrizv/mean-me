import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm : FormGroup;
  message: string;
  messageClass : string;

  constructor(
    private auth: AuthService,
    private router: Router
  ) {
    this.loginForm = new FormGroup({
      username: new FormControl("", [
        Validators.required
      ]),
      password: new FormControl("", [
        Validators.required,
      ])
    });
   }

  ngOnInit() {
  }

  login () {
    const user = {
      username: this.loginForm.get('username').value,
      password: this.loginForm.get('password').value
    };

    console.log('user data', user)
    
    this.auth.login(user).subscribe(
      data => {
        console.log('login data', data)
        if (data.success) {
          this.messageClass = 'alert alert-success'; // Set a success class
          this.message = data.message;
          this.auth.storeUserData(data.token, data.user);
          setTimeout(() => {
            this.router.navigate(['/dashboard']); // Redirect to login view
          });
        } else {
          this.messageClass = 'alert alert-danger'; // Set a success class
          this.message = data.message;
        }

      } 
    );    
  }
}
