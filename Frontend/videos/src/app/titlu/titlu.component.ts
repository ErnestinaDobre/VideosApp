import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-titlu',
  templateUrl: './titlu.component.html',
  styleUrls: ['./titlu.component.css']
})
export class TitluComponent implements OnInit {

  @Input() titlul : string;
  
  constructor() { }

  ngOnInit() {
  }

}
