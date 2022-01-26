import { Injectable, Input, OnInit } from '@angular/core';
import { Lugare } from './models/chatMessageDto';
import { NavController } from '@ionic/angular';

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


  constructor(private navCtrl: NavController) { }
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

    // Recibe los mensajes Y  LOS ESCUCHA TAMBIEN
    this.websocket.onmessage = (event1) => {
      console.log("mensaje Recibido:");
      console.log(event1.data);
      //PREGUNTARR ESTOO
      window.localStorage.setItem('jsonChatNenssages', event1.data);
      this.process_json();
    };

    // clausura la conexion
    this.websocket.onclose = (event) => {
      // SE CERRO LA CONEXION 
      console.log('close: ', event);    
      this.open = false;
      this.navCtrl.navigateForward('/tabs/tab1');
      console.log ("cambio de pagina a tab1");
    }
  }

  public process_json() {

    this.leer = window.localStorage['jsonChatNenssages']
    var messages = JSON.parse(this.leer);
    console.log('process_json:', messages);

    for (let dato of Object.values(messages)) {
      console.log('dato', dato);
      for (let value of Object.values(dato)) {
        console.log('value', value);
        for (let otro of Object.values(value)) {
          console.log('dato3', otro);
        }

        for (let nuevoFor of Object.values(this.chatMessages)) {
          console.log('nuevoFor', nuevoFor);
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
      console.log ('--------->name', dato.name);
      if (dato.name === ubicado) {
        console.log (dato.name);
        dato.acciones.map(accion => {
          
          if (accion.ID === eventoId) {
            console.log ('--------->ID',accion.ID);
            console.log ('--------->MAC', accion.MAC);
            if (accion.status === "OFF") {
              accion.status = "ON";
              this.activatedLED = false;
            }
            else {
              accion.status = "OFF";
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
    //this.websocket.close();
  }
  
}
