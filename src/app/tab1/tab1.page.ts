import { Component, OnInit } from '@angular/core';
import { webSocket } from "rxjs/webSocket";



@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  subject = webSocket('ws://192.168.1.104:81');
  message:string = 'hello';
  public Dormitorio: boolean;
  datoEsp:number;
 

  constructor( 
    
  ) {}
  
  
  ngOnInit(){
    console.log('hola mundo');
    // Recibir mensajes
    this.subject.subscribe(mensaje => console.log(mensaje));
  }

  sendToServer($event){
    this.subject.subscribe();
    console.log(this.Dormitorio);
    this.subject.next("LED");
   // this.subject.next(this.message);
   
   if(this.Dormitorio == true){
    this.datoEsp = 1; //ENCENDIDO
    this.subject.next(this.datoEsp);
   }

   else {
    this.datoEsp = 0; //apagado
    this.subject.next(this.datoEsp);
   }
  
   if(this.message == "ON"){
     this.datoEsp = 1; //ENCENDIDO
     this.subject.next(this.datoEsp);
   }
   else if (this.message == "OFF"){
    this.datoEsp = 0; //apagado
    this.subject.next(this.datoEsp);
   }
    
   // this.subject.complete();
    this.subject.error({code: 4000, reason: 'I think our app just broke!'});
  }
}
