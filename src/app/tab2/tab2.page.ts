import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiarduinoServiceService } from '../apiarduino-service.service';

interface Componente{
  icon: string;
  name:string;
  redirectTo:string;
}



@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit, OnDestroy {

  componentes: Componente[] = [
    {
      icon: 'american-football',
      name: 'Action Sheet',
      redirectTo: '/action-sheet'
    },
    {
      icon: 'logo-apple-appstore',
      name: 'Alert',
      redirectTo: '/alert'
    }
  ];

  constructor( public websocketservice:ApiarduinoServiceService) {
    
  }

  ngOnInit(){
    this.websocketservice.openWebsocket();
  }

  ngOnDestroy(){
   //this.websocketservice.closeWebsocket();
  }
}
