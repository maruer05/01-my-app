import { Injectable, Input, OnInit } from '@angular/core';
import { Lugare } from './models/chatMessageDto';


@Injectable({
  providedIn: 'root'
})
export class ApiarduinoServiceService implements OnInit{

  websocket: WebSocket;
  

  public chatMessages:Lugare[] = [];
  public IPdireccion:string ='';
  bandera:boolean = false;
  activatedLED: boolean = false;


  constructor(
    
  ) { }

  ngOnInit(){
  
      
  }

public openWebsocket(){
  this.websocket = new WebSocket(`ws://${this.IPdireccion}:81`);
  ///this.websocket = new WebSocket('ws://192.168.1.5:81');
  // abre la conexion websocket
  
  this.websocket.onopen = (event) => {
   console.log('open: ', event);
   //this.websocket.send('connected');
  };

  // Recibe los mensajes Y AL PARECER LOS ESCUCHA TAMBIEN :/
   this.websocket.onmessage = (event1) =>{
   console.log("mensaje Recibido:");
   console.log(event1.data);
   console.log("mensaje JSON.PARSE:");
   var messages = JSON.parse(event1.data); 
   console.log('messages',messages);
   console.log("interface");
   
   for (let dato of Object.values(messages)){
    //console.log('dato1', dato );
    for (let value of  Object.values(dato)){
      //console.log('dato2', value);

      for( let otro of Object.values(value)){
       // console.log('dato3', otro);
      }

     // console.log('value.name',value.name);

     for( let nuevoFor of Object.values(this.chatMessages)){
       // console.log('nuevoFor', nuevoFor);
        if( value.name === nuevoFor.name){
         this.bandera = true;
        }
     }

     if( this.bandera === false){
        this.chatMessages.push(value);
     }
   
    }   
   
   }  
   console.log(this.chatMessages);

  };
// clausura la conexion
  this.websocket.onclose = (event) => {
    console.log('close: ', event);
  }
 
  
}
// el error se da porque tengo que enviar de vuelta un JSON y no un string
hola:string; 

public sendMessage(ubicado,eventoId){

  console.log('sendMessage',ubicado);
  console.log('sendMessage', eventoId);
/*
  this.chatMessages.map( dato => {
    if(dato.name == eventoId){
      console.log('datostatus',dato.status);
      if( dato.status === "ON"){
          dato.status = "OFF";
      }      
      else{
        dato.status = "ON";
      }
     
      this.hola=`{\"dispositivos\":[{\"name\": \"${eventoId}\", \"status\": \"${dato.status}\"}]}`;
      
    }  
    return dato;
  });*////

  this.chatMessages.map(dato => {
    if(dato.name===ubicado){
    
      dato.acciones.map( accion => 
        {
          if(accion.ID === eventoId){
              if(accion.status === "ON"){
                accion.status = "OFF";
                this.activatedLED = false
              }
              else{
                accion.status = "ON";
                this.activatedLED = true;
              }     
          }
          console.log('accion',accion);
        } 
     
      )
    }
    this.websocket.send(JSON.stringify(dato));
    return dato;
    
  })
 
  console.log('chatmessages:',(this.chatMessages));
 // console.log('hola:', (this.hola));
 // this.websocket.send(this.hola);  
}

public closeWebsocket(){
  this.websocket.close();
}

public ipdatoform(ip:string){
  console.log('ipdesdedataform', ip);
  this.IPdireccion = ip;
  this.openWebsocket();

}
}



/* AHORA USAR ESTE JSON PARA CREAR LOS BOTONES 
{
  "LUGARES": [
    {
      "name": "cocina",
      "acciones": [
        {
          "ID": "LUZ",
          "status": "OFF"
        },
        {
          "ID": "VENTILADOR",
          "status": "OFF"
        },
        {
          "ID": "PERSIANA",
          "status": "OFF"
        }
      ]
    },
    {
      "name": "habitacion",
      "acciones": [
        {
          "ID": "LUZ",
          "status": "OFF"
        },
        {
          "ID": "VENTILADOR",
          "status": "OFF"
        },
        {
          "ID": "PERSIANA",
          "status": "OFF"
        }
      ]
    },
    {
      "name": "garage",
      "acciones": [
        {
          "ID": "LUZ",
          "status": "OFF"
        },
        {
          "ID": "VENTILADOR",
          "status": "OFF"
        },
        {
          "ID": "PERSIANA",
          "status": "OFF"
        }
      ]
    }
  ]
}
*/ 
