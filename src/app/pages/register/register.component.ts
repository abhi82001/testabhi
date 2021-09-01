
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/authservice/auth.service'
import { User } from 'src/app/shared/model/student.model';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  selectedValue!: string;
  selectedUser!: string;
  users :User[]= [
    {value:'School', viewValue: 'School'},
    {value:'Ngo', viewValue: 'Ngo'}
  ];


  registerForm!: FormGroup;
  submitted!: boolean;

  constructor(public authService: AuthService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      'firstname' : new FormControl(null, Validators.required),
      'lastname': new FormControl(null,Validators.required ),
      'email': new FormControl(null, [Validators.required, Validators.email, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]),
      'password': new FormControl(null, Validators.required),
      'confirmpassword': new FormControl(null, Validators.required),
      'usertype':new FormControl('School', Validators.required),
      'selecteduser': new FormControl(null, Validators.required)
    });
  }
  get f() { return this.registerForm.controls; }
  onSubmit(){
   this.submitted = true;
    console.log(this.registerForm)
  }

}
