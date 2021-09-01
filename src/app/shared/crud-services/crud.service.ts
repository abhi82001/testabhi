import { Injectable } from '@angular/core';
import  {AngularFireList}  from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';



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
  //Update Existing Student  
  // updateStudentInforamtion(studentid: string, studentInfo: any) {  
  //   delete studentInfo.key;  
  //   this.firestore.doc('Student/' + studentid).update(studentInfo);  
  // }  
  

  // updateStudentInformation(studentkey:string, studentInfo:any){
  //   delete studentInfo.key
  //   this.firestore.doc('Student/' + studentkey).update(studentInfo.key)
  // }

  updateStudentInformation(student:any){
    console.log(student)
    this.studentList.update(student.$key,{
      studentClass: student.StudentClass,
      studentName: student.StudentName,
      Date: student.Date
    })
  }

  //Delete Student  
  deleteStudent($key: string) {  
    this.firestore.doc('Student/' + $key).delete();  
  }  

  

  // getAllStudent(){
  //   this.studentList = this.firestore.collection('students');
  //   return this.studentList.snapshotChanges();
  // }

  // insertStudent(student:any){
  //   this.studentList.push({
  //     studentClass: student.studentClass,
  //     studentName : student.studentName
  //   })
  // }

  // updateStudent(student:any){
  //   this.studentList.update(student.$key, {
  //     studentClass: student.studentClass,
  //     studentName: student.studentName
  //   })
  // }

populateForm(Student:any){
  this.form.setValue(Student);
}

  // populateForm($key:any){
  //   this.form.setValue($key);
  // }

  // deleteStudent($key:string){
  //   this.studentList.remove($key);
  // }

  formatDate(date:Date):string{
    const day= date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${year}-${month}-${day}`;
  }
}
