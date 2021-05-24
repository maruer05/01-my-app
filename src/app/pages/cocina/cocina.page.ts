import { Component, OnInit } from '@angular/core';
import { ApiarduinoServiceService } from 'src/app/apiarduino-service.service';
import { info, Lugare } from 'src/app/models/chatMessageDto';

@Component({
  selector: 'app-cocina',
  templateUrl: './cocina.page.html',
  styleUrls: ['./cocina.page.scss'],
})


export class CocinaPage implements OnInit {


  variable:Lugare[] = [];
  acciones:info[] = [];
  bandera:boolean = false;

  constructor(public websocketservice:ApiarduinoServiceService) {
       

  }

  ngOnInit(){
    this.websocketservice.openWebsocket();

    this.variable = this.websocketservice.chatMessages;
    console.log('variablecocina',this.variable);
    
    this.variable.map(resp => console.log(resp));
    
    for( let messagesChat1 of Object.values(this.variable)){
      console.log('nuevoFordeCocina1', messagesChat1);
       
     
      //preguntar esto 
      if(messagesChat1.name === "cocina"){
        this.bandera = true;
        for( let messagesChat2 of Object.values(messagesChat1.acciones)){
          console.log('nuevoFordeCocina2', messagesChat2);
          this.acciones.push(messagesChat2);
        }
      }
    
    }
    console.log('messagesChat2', this.acciones);
    
    
  }

  ngOnDestroy(){
    this.websocketservice.closeWebsocket();
  }

  sendWebsocket($event){
    console.log($event.path[0].id);
    console.log('$event',$event.detail.value);
    let ubicado = $event.detail.value;
    let eventoId = $event.path[0].id 

    this.websocketservice.sendMessage(ubicado,eventoId);
  }

}
