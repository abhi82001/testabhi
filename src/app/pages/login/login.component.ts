import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/authservice/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public authService: AuthService ) { }

  ngOnInit(): void {
  }

  login(){
    // this.authService.SignIn("userEmail"," userPassword")
    console.log(this.authService)
  }

}
