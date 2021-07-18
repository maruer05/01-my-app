import { Component, OnInit,Input } from '@angular/core';
import { ApiarduinoServiceService } from '../apiarduino-service.service';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
 
 @Input() ip:string;  

  constructor( private websocketS:ApiarduinoServiceService) {
   
  }
  

ngOnInit(){
  
}

logform(){
  console.log('entra en el logform'); 
  console.log(this.ip);
  window.localStorage['IP'] = this.ip; //solo puede almacenar texto
  //this.websocketS.ipdatoform(this.ip);
}

}
