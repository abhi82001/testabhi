import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
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
  
  
  constructor(public authService:AuthService, public afs: AngularFirestore,public afAuth: AngularFireAuth) { }

  ngOnInit(): void {
    this.loggedIn = this.authService.isLoggedIn
    this.afAuth.authState.subscribe(user=>{
     console.log(user)
    this.afs.collection('/users').doc(user?.uid).get().toPromise()
    .then((doc) => {
      if (doc.exists) {
        console.log("Document data:", doc.data());
        let data: User = doc.data() as User
        this.role = data.role
     }
   })  
   })
 
}
  toggleNavbar(){
    this.navbarOpen = !this.navbarOpen;
  }

}

