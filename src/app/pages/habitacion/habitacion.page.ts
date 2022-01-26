import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiarduinoServiceService } from 'src/app/apiarduino-service.service';
import { info, Lugare } from 'src/app/models/chatMessageDto';

@Component({
  selector: 'app-habitacion',
  templateUrl: './habitacion.page.html',
  styleUrls: ['./habitacion.page.scss'],
})
export class HabitacionPage implements OnInit, OnDestroy {

  variable: Lugare[] = [];
  acciones: info[] = [];
  bandera: boolean = false;

  constructor(public websocketservice: ApiarduinoServiceService) { }

  ngOnInit() {
    this.websocketservice.openWebsocket();
    this.websocketservice.process_json();
    this.variable = this.websocketservice.chatMessages;
    this.variable.map(resp => console.log(resp));

    for (let messagesChat1 of Object.values(this.variable)) {
      if (messagesChat1.name === "Habitación") {
        this.bandera = true;
        for (let messagesChat2 of Object.values(messagesChat1.acciones)) {
          this.acciones.push(messagesChat2);
        }
      }
    }
    console.log('messagesChat2', this.acciones);
  }

  ngOnDestroy() {
    this.websocketservice.closeWebsocket();
  }

  sendWebsocket($event) {
    console.log($event.path[0].id);
    console.log('$event', $event.detail.value);
    let ubicado = $event.detail.value;
    let eventoId = $event.path[0].id
    console.log('event$$', $event);
    this.websocketservice.sendMessage(ubicado, eventoId);
  }

}
