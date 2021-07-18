import { Injectable, Input, OnInit } from '@angular/core';
import { Lugare } from './models/chatMessageDto';


@Injectable({
  providedIn: 'root'
})
export class ApiarduinoServiceService implements OnInit {

  websocket: WebSocket;
  public chatMessages: Lugare[] = [];
  public IPdireccion: string = '';
  bandera: boolean = false;
  open: boolean = false;
  activatedLED: boolean = false;
  leer: string;


  constructor() { }
  ngOnInit() { }

  public openWebsocket() {
    var DireccionIP = window.localStorage['IP'];
    console.log('ApiArduino:', DireccionIP);
    if (this.open == false) {
      this.websocket = new WebSocket(`ws://${DireccionIP}:81`);

      // abre la conexion websocket
      this.websocket.onopen = (event) => {
        console.log('open connectado: ', event);
        this.open = true;
      };
    }

    // Recibe los mensajes Y AL PARECER LOS ESCUCHA TAMBIEN
    this.websocket.onmessage = (event1) => {
      console.log("mensaje Recibido:");
      console.log(event1.data);
      //PREGUNTARR ESTOO
      window.localStorage.setItem('jsonChatNenssages', event1.data);
      this.process_json();
    };

    // clausura la conexion
    this.websocket.onclose = (event) => {
      console.log('close: ', event);
      this.open = false;
    }
  }

  public process_json() {

    this.leer = window.localStorage['jsonChatNenssages']
    var messages = JSON.parse(this.leer);
    console.log('process_json:', messages);

    for (let dato of Object.values(messages)) {
      //console.log('dato', dato);
      for (let value of Object.values(dato)) {
        //console.log('value', value);
        for (let otro of Object.values(value)) {
          // console.log('dato3', otro);
        }

        for (let nuevoFor of Object.values(this.chatMessages)) {
          //console.log('nuevoFor', nuevoFor);
          if (value.name === nuevoFor.name) {
            this.bandera = true;
          }
        }

        if (this.bandera === false) {
          this.chatMessages.push(value);
        }
      }
    }
    console.log('Mensaje Process Json:', this.chatMessages);
  }

  hola: string;
  guardar: Lugare[] = [];

  public sendMessage(ubicado, eventoId) {

    console.log('sendMessage', ubicado);
    console.log('sendMessage', eventoId);
    
    this.process_json();

    this.chatMessages.map(dato => {
      if (dato.name === ubicado) {

        dato.acciones.map(accion => {
          if (accion.ID === eventoId) {
            if (accion.status === "ON") {
              accion.status = "OFF";
              this.activatedLED = false;

            }
            else {
              accion.status = "ON";
              this.activatedLED = true;
            }

          }
        }
        )
      }

      return dato;
    })
    
    console.log('chatmessagesOJO:', (this.chatMessages));
    this.websocket.send(JSON.stringify(this.chatMessages));

  }

  public closeWebsocket() {
    this.websocket.close();
  }
  /*
  public ipdatoform(ip:string){
    console.log('ipdesdedataform', ip);
    this.IPdireccion = ip;
    this.openWebsocket();
  
  }*/
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
