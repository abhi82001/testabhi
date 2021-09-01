import { Component, OnInit, AfterViewInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { CrudService } from 'src/app/shared/crud-services/crud.service';
import Swal from 'sweetalert2';
import { Class, Student, User } from 'src/app/shared/model/student.model';
import { AngularFireList } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import {MatCalendarCellClassFunction} from '@angular/material/datepicker';
import { add } from 'lodash';



@Component({
  selector: 'app-schooluser',
  templateUrl: './schooluser.component.html',
  styleUrls: ['./schooluser.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class SchooluserComponent implements OnInit {
  displayedColumns: string[] = ['No.', 'StudentClass', 'StudentName', 'Date' ,'Action'];
  students: Student[] = [];
  Student: Student = new Student();
  formSubmitted?: boolean;
  updateStudent: boolean = false;
  studentId? = null;
  isDelete?: boolean;
  StudentName! : string;
  StudentClass!: any;

//=========================Date-Field======================//
dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
  // Only highligh dates inside the month view.
  if (view === 'month') {
    const date = cellDate.getDate();

    // Highlight the 1st and 20th day of each month.
    return (date === 1 || date === 20) ? 'example-custom-date-class' : '';
  }

  return '';
}
//===========================================================//

  classes: Class[] = [
    {value: 'I', viewValue: 'I'},
    {value: 'II', viewValue: 'II'},
    {value: 'III', viewValue: 'III'},
    {value: 'IV', viewValue: 'IV'},
    {value: 'V', viewValue: 'V'},
    {value: 'VI', viewValue: 'VI'},
    {value: 'VII', viewValue: 'VII'},
    {value: 'VIII', viewValue: 'VIII'},
    {value: 'IX', viewValue: 'IX'},
    {value: 'X', viewValue: 'X'},
    {value: 'XI', viewValue: 'XI'},
    {value: 'XII', viewValue: 'XII'}
  ];
  // studentForm!: FormGroup;

  StudentList!: AngularFireList<any>;
  dialogConfig!: MatDialogConfig<any>;
  constructor(
    public service: CrudService, 
    public angularFirestore:AngularFirestore,
    public dialog: MatDialog

    ) {this.getAllStudent();}
  submitted!: boolean;
  studentData!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  ngOnInit(): void {
  this.service.getAllStudent().subscribe();

}
getAllStudent() {
  this.service.getAllStudent().subscribe((data: any)=>{
    this.students = data.map((e: { payload: { doc: { key: any; data: () => any; }; }; }) => {
      return {
        $key:e.payload.doc.key,
        ...e.payload.doc.data()
      }as Student;
    });
    console.log(this.students);
    this.studentData = new MatTableDataSource(this.students)
    this.studentData.paginator = this.paginator;
  });
}

// onSubmit(f:any) {
//   if(f.form.valid){
//     if(this.studentId == null){
//       this.service.addStudentInforamtion({
//         studentClass: this.Student.studentClass,
//         studentName: this.Student.studentName
//       })
//     }else{
//       this.service.updateStudent({
//         // StudentClass: this.Student.studentClass,
//         // studentName: this.Student.studentName
//       })
//     }
//     this.Student = new Student();
//     f.submitted = false;
//     this.formSubmitted = true;
//     this.updateStudent = false;
//     setInterval(()=>{
//       this.formSubmitted = false;
//     }, 2000)
//   }
// }

// onSubmit(){
//   if(this.service.form.valid){
//       if(!this.service.form.controls['$key'].value  == null)
//       this.service.addStudentInformation(this.service.form.value);
//         else
//         this.service.updateStudentInformation(this.service.form.value);
//     this.service.form.reset();
//     this.service.initializeFormGroup();
//   }
// }

onSubmit(){
  
  this.angularFirestore.collection("Student").doc().set({
    studentClass: '',
    studentName: '',
    date: ''
  }).then(()=> {
    console.log("Document successfully written!")
    
  }).catch((error) => {
    console.error("Error writing document: ", error);
  });

}

onEdit(row:string){
  this.service.populateForm(row);
  console.log(row, "edited")
}
 
// ondelete($key:any){
//   this.service.deleteStudent($key);
//       console.log($key)
//     }

ondelete(){
  this.angularFirestore.collection('Student').doc('$key').delete()
  .then(()=> {
    console.log("Document successfully deleted!");
  }).catch((error) => {
      console.error("Error removing document: ", error);
  
  })
}
}




// const dialogConfig = new MatDialogConfig();
  // dialogConfig.disableClose = true;
  // dialogConfig.autoFocus= true;
  // this.dialog.open(DialogBoxComponent)