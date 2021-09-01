import { Component, OnInit, ViewChild,ViewEncapsulation } from '@angular/core';
import { CrudService } from 'src/app/shared/crud-services/crud.service';
import { Student } from 'src/app/shared/model/student.model';
import { MatTableDataSource } from '@angular/material/table';
import { viewClassName } from '@angular/compiler';
import { MatPaginator } from '@angular/material/paginator';
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';



@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class StudentListComponent implements OnInit {
  students: any;
  searchKey!:string;
  constructor(private service: CrudService) {this.getAllStudent()};
  studentData!: MatTableDataSource<any>;
  displayedColumns: string[] = ['No.','StudentClass', 'StudentName', 'Date' ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

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
      this.studentData = new MatTableDataSource(this.students);
      this.studentData.paginator = this.paginator;
     
    });
  }

  onSearchClear(){
    this.searchKey = '';
    this.applyFilter();
  }

  applyFilter(){
    this.studentData.filter = this.searchKey.trim().toLocaleLowerCase();  
  }
}
