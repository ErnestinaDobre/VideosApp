import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HighlightDirective } from './directive/highlight.directive';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'videos';
  content = 'Angular highlight text';
}
