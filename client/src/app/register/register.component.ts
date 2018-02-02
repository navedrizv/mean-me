import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})


export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  message: string;
  messageClass: string;

  constructor(
    private auth: AuthService,
    private router : Router
  ) {
    this.registerForm = new FormGroup({
      username: new FormControl("", [
        Validators.required,
        Validators.maxLength(5),
        this.validateUsername
      ]),
      name: new FormControl("", [
        Validators.required
      ]),
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(15)
      ])
    });
  }

  ngOnInit() {

  }

  register() {
    console.log(this.registerForm);

    const user = {
      username: this.registerForm.get('username').value,
      name: this.registerForm.get('name').value,
      password: this.registerForm.get('password').value
    };

    console.log('user=', user);

    this.auth.registerUser(user).subscribe(
      data => {
        console.log("register User", data);
        if (data.success) {
          this.messageClass = 'alert alert-success'; // Set a success class
          this.message = data.message;
          
          setTimeout(() => {
            this.router.navigate(['/login']); // Redirect to login view
          }, 2000);
        } else {
          this.messageClass = 'alert alert-danger'; // Set a success class
          this.message = data.message;
        }

      }
    );
  }


  // Function to validate username is proper format
  validateUsername(controls) {
    // Create a regular expression
    const regExp = new RegExp(/^[a-zA-Z0-9]+$/);

    // Test username against regular expression
    if (regExp.test(controls.value)) {
      return null; // Return as valid username
    } else {
      return { 'validateUsername': true } // Return as invalid username
    }
  }


  checkUsername() {
    this.auth.checkUsername(this.registerForm.get('username').value)
      .subscribe(
      data => {
        console.log(data);
        // if (data.success) {
        //   console.log(data.message);
        // }
      });
  }
}
