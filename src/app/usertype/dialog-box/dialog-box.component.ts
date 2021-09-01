import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CrudService } from 'src/app/shared/crud-services/crud.service';
@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.css']
})
export class DialogBoxComponent implements OnInit {

 

  constructor(
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    public service: CrudService, 
    @Inject(MAT_DIALOG_DATA)public data: any
    ) { }

  ngOnInit(): void {
  }
  onCancle(): void {
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.dialogRef.close();
    }

    onUpdate() {
     

    }
}
