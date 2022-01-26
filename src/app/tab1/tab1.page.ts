import { Component, OnInit,Input } from '@angular/core';
import { ApiarduinoServiceService } from '../apiarduino-service.service';
import {LoadingController} from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
 
 @Input() ip:string;  

  constructor( private websocketS:ApiarduinoServiceService, public loadingController: LoadingController,private router: Router) {
   
  }
  

ngOnInit(){
  
}

logform(){


  //this.websocketS.ipdatoform(this.ip);
}

async presentLoading() {
  const loading = await this.loadingController.create({
    cssClass: 'my-custom-class',
    message: 'Espera por favor',
    duration: 5000,
  });
  await loading.present();

  const { role, data } = await loading.onDidDismiss();
  console.log('Loading dismissed!');

  console.log('entra en el logform'); 
  console.log(this.ip);
  window.localStorage['IP'] = this.ip; //solo puede almacenar texto

  this.router.navigateByUrl('/tabs/tab2')
}

}
