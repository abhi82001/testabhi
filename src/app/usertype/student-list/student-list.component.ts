import { Component, OnInit, ViewChild,ViewEncapsulation } from '@angular/core';
import { CrudService } from 'src/app/shared/crud-services/crud.service';
import { Student } from 'src/app/shared/model/student.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';
import { DatePipe } from '@angular/common';
import { Moment } from 'moment';
import * as moment from 'moment';



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
  pipe!: DatePipe
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
          ...e.payload.doc.data(),
          datestring: moment (new Date(e.payload.doc.data().Date.seconds*1000)).utc().format("MM/DD/YYYY")
        }as Student;
      });
      console.log(this.students);
      this.studentData = new MatTableDataSource(this.students);
      this.studentData.paginator = this.paginator;
      // this.studentData.filterPredicate = (data, filter: string)=>{
      //   return !filter ||data.startTime.includes(filter);
      // }
    });
  }

  onSearchClear(){
    this.searchKey = '';
    // this.applyFilter();
  }


  // applyFilter(event: Event) {
  //       console.log("date")
  //     const filterValue = (event.target as HTMLInputElement).value;
  //     this.studentData.filter = filterValue.trim().toLowerCase();
  //   }


  applyFilter(event:Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.studentData.filter = filterValue.trim().toLowerCase();
}

onDatePickerChange(type?:string, dateObj?:any){
  let picker = moment (new Date(dateObj.value)).utc().format("MM/DD/YYYY");
  this.studentData.filter = picker.trim().toLowerCase();

}
  // filterPeriod(data: any, filter: string) {
  //   return this.studentData.data = this.studentData.data.filter(e=> e.Date)
  // }



  // applyFilter (filterValue){
  //   this.studentData.filterPredicate = this.searchKey.trim();  
  // }
}
