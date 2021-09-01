import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestoreDocument } from '@angular/fire/firestore';
import { AuthService } from 'src/app/shared/authservice/auth.service';
import { User } from 'src/app/shared/authservice/user';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  loggedIn: boolean=  false;
  navbarOpen = false;
  role: string ='';
  
  
  constructor(public authService:AuthService, afAuth: AngularFireAuth) { }

  ngOnInit(): void {
    this.loggedIn = this.authService.isLoggedIn
   this.role = this.authService.role
    }  
 
  toggleNavbar(){
    this.navbarOpen = !this.navbarOpen;
  }

}
