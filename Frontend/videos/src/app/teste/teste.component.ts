import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-teste',
  templateUrl: './teste.component.html',
  styleUrls: ['./teste.component.css']
})
export class TesteComponent implements OnInit {

  numere : number[] = [2,3,4,5,6,7];
  pare : boolean = false;

  unText : string = 'Salutare lume Java este the best';

  constructor() { }

  ngOnInit() {
    
  }

  alegePare(){
    this.pare = true;
  }

  alegeImpare(){
    this.pare = false;
  }

  filtrareNumerePare(){
    console.log('pare sau impare: ', this.pare);
    // let numereleFiltrate  = this.numere.filter(x => this.pare ? (x%2==0) : (x%2 == 1) );
    let numereleFiltrate  = this.numere.filter(function(x){
      console.log('this este: ', this);
      if(this.pare){
        return x%2 == 0;
      }
       return x%2 == 1; 
      });
    console.log('numerele filtrate sunt: ', numereleFiltrate);
  }

}
