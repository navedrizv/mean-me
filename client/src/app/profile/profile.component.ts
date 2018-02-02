import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  token;
  username;

  constructor(private auth: AuthService) {
    this.token = localStorage.getItem('token');
    console.log('token', this.token);
  }

  ngOnInit() {
    this.auth.getUser().subscribe(profile => {
      // this.username = profile.user.username;      
    });
  }
  
}
