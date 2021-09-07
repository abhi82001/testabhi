import { Injectable } from '@angular/core';
import  {AngularFireList}  from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Student } from '../model/student.model';



@Injectable({
  providedIn: 'root'
})
export  class CrudService {
  

  constructor(private firestore: AngularFirestore) { }
  
  // constructor( public firebase: AngularFireDatabase) { }
  studentList!: AngularFireList<any>;


  form:FormGroup = new FormGroup({
    $key: new FormControl(null),
    studentClass: new FormControl('', Validators.required),
    studentName: new FormControl('', Validators.required),
    Date: new FormControl('', Validators.required)
  });

  initializeFormGroup(){
    this.form.setValue({
      $key:null,
      studentName: '',
      studentClass: '',
      Date: ''
    })
  }


  getAllStudent() {
    return this.firestore.collection('Student').snapshotChanges();
  }
   //Adding new Student   
   addStudentInformation(studentInfo: any) {  
     console.log(studentInfo)
    return this.firestore.collection('Student').add(studentInfo);  
  }  
 
  
updateStudentInformation(student: any){
  return this.firestore.collection('Student')
  .doc('$key').update({
    studentClass: student.StudentClass,
      studentName: student.StudentName,
      Date: student.Date
  })
}
 


populateForm(Student:any){
  console.log(Student)
  this.form.patchValue(Student);
}



 
deleteStudent($key:any){
  console.log($key)
  this.firestore.doc('Student/' + $key).delete();
}  


  formatDate(date:Date):string{
    const day= date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${year}-${month}-${day}`;
  }
}
