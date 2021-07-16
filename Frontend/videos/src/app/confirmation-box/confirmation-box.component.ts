import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-confirmation-box',
  templateUrl: './confirmation-box.component.html',
  styleUrls: ['./confirmation-box.component.css']
})
export class ConfirmationBoxComponent implements OnInit {

  mesaj : string;

  constructor(public dialogRef: MatDialogRef<ConfirmationBoxComponent>,
    @Inject (MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }
  
 
}
