import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { CrudService } from 'src/app/shared/crud-services/crud.service';
import { Class, Student} from 'src/app/shared/model/student.model';
import { AngularFireList } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
// import { MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {MatCalendarCellClassFunction} from '@angular/material/datepicker';



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
  studentId = '';
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
  // dialogConfig!: MatDialogConfig<any>;
  constructor(
    public service: CrudService, 
    public angularFirestore:AngularFirestore,
    // public dialog: MatDialog

    ) {this.getAllStudent();}
  submitted!: boolean;
  studentData!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  ngOnInit(): void {
  this.service.getAllStudent().subscribe();

}
getAllStudent() {
  this.service.getAllStudent().subscribe((data: any)=>{
    console.log(data)
    this.students = data.map((e: { payload: { doc: { id: any; data: () => any; }; }; }) => {
      return {
        $key:e.payload.doc.id,
        ...e.payload.doc.data()
      }as Student;
    });
    console.log(this.students);
    this.studentData = new MatTableDataSource(this.students)
    this.studentData.paginator = this.paginator;
  });
}



onSubmit(){
  console.log(this.service.form.value)
  
  const docid = this.service.form.value.$key ? this.service.form.value.$key : this.angularFirestore.createId()
  this.angularFirestore.collection("Student").doc(docid).set({
    studentClass: this.service.form.value.studentClass,
    studentName: this.service.form.value.studentName,
    Date: this.service.form.value.Date,
  }).then(()=> {
    this.service.form.reset()
    console.log("Document successfully written!")
    
  }).catch((error) => {
    console.error("Error writing document: ", error);
  });

}





onEdit(row:string){
  this.service.populateForm(row);
}
 


ondelete(index:number){
  this.angularFirestore.doc('Students/'+index).delete()
  .then((res:any)=> {
    console.log("Document successfully deleted!");
    this.students.splice(index,1);
    this.studentData = new MatTableDataSource(this.students)
  this.studentData.paginator = this.paginator;

  }).catch((error) => {
      console.error("Error removing document: ", error);
  
  })
}
}










