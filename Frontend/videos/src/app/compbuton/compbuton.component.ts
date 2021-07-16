import { Component, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-compbuton',
  templateUrl: './compbuton.component.html',
  styleUrls: ['./compbuton.component.css']
})
export class CompbutonComponent implements OnInit {

  constructor() { }

  nrClicks : number = 0;

  @Output() evenimentClickBtnChild = new EventEmitter<number>();

  ngOnInit() {
  }

  clickBtn(){
    this.nrClicks++;
    console.log('(CompbutonComponent) button has been clicked');
    this.evenimentClickBtnChild.emit(this.nrClicks);
  }


}
