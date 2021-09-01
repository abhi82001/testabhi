import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from "@angular/router";
import firebase from 'firebase';
import { BehaviorSubject } from 'rxjs';
import Swal from 'sweetalert2';
import { User } from './user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // userData?: firebase.User;
  userData?: any;
  role!:string;
  GoogleAuthProvider: any;

  constructor(
    public afs: AngularFirestore, //Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone, // NgZone service to remove outside scope warning 
  ) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user') || '{}');
      } else {
        localStorage.setItem('user', null!);
        JSON.parse(localStorage.getItem('user') || '{}');
      }
    })
  }

 

  SignIn(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          this.afs.collection('/users').doc(result.user?.uid).get().toPromise()
            .then((doc) => {
              if (doc.exists) {
                console.log("Document data:", doc.data());
                let data: User = doc.data() as User
                if (data.role && data.role == 'School') {
                  this.router.navigate(['/'])
                } else {
                  this.router.navigate(['/ngouser'])
                }
              } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
              }
            });
        });Swal.fire("Successfully login")
        // this.SetUserData(result.user, this.role);
      }).catch((error)=>{
        Swal.fire(error.message)
      })

  }
 

  //Sign up with email/password

  SignUp(email: string, password: string, role: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign 
        up and returns promise */
        this.SendVerificationMail();
        this.ngZone.run(() => {
          this.router.navigate(['/login'])
        })
        console.log(result, result.user)
        this.SetUserData(result.user, role);
      }).catch((error) => {
        Swal.fire(error.message)
        // window.alert(error.message)
      })
  }

  //Send email verification when new user sign up
   async SendVerificationMail() {
    const user = await this.afAuth.currentUser
    user?.sendEmailVerification()
    .then(()=>{
      this.router.navigate(['verify-email']);
    })
  }

  //email verify




  // //  Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new this.GoogleAuthProvider());
  }

  // Auth logic to run auth providers
  AuthLogin(provider: any) {
    return this.afAuth.signInWithPopup(provider)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['/dashboard']);
        })

      }).catch((error) => {
        window.alert(error)
      })
  }

  /* Setting up user data when sign in with username/password, 
sign up with username/password and sign in with social auth  
provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user: any, role: string) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: any = {
      uid: user.uid,
      email: user.email,
      role: role
    }
    return userRef.set(userData, {
      merge: true 
    })
  }

  //Rest Forgot password
  ForgotPassword(passwordResentEmail: any) {
    return this.afAuth.sendPasswordResetEmail(passwordResentEmail)
      .then(() => {
        Swal.fire("Password reset email sent, Check your inbox.")
        // window.alert('Password reset email sent, Check your inbox.');
      }).catch((error) => {
        window.alert(error)
      })
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return (user !== null) ? true : false;

  }

  // Sign out 
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['/login']);
      Swal.fire("you are logout..!")
    })
  }

}



// SignIn(email: string, password: string){
//   return this.afAuth.signInWithEmailAndPassword(email,password)
//   .then((result)=> {
//     this.ngZone.run(()=> {
//       this.afs.collection('/users').doc(result.user?.uid).get().toPromise()
//        .then((doc) => {
//         if (doc.exists) {
//             console.log("Document data:", doc.data());
//             let data:User = doc.data() as User
//              if (data.role && data.role == 'School'){
//                 this.router.navigate(['/'])
//              }else {
//               this.router.navigate(['/ngouser'])
//              }
//         } else {
//             // doc.data() will be undefined in this case
//             console.log("No such document!");
//         }
//         // this.SetUserData(result.user);
//     }).catch((error) => {
//       window.alert(error.message)
//       // Swal.fire(error.message)
//       console.log("Error getting document:", error);
//     });
//       });
//       Swal.fire('Successfully Logged-In')
//     });

// }