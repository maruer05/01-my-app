import { Component, OnInit } from '@angular/core';
import { webSocket } from "rxjs/webSocket";

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  subject = webSocket('ws://8266esp:81');
  message = 'hello';
  

  constructor(
    
  ) {}
    
  
  ngOnInit(){
    console.log('hola mundo');
    this.listentoWebsocket();
 
  }

 

  sendToServer($event){
    this.subject.subscribe();
    this.subject.next(this.message);
    this.subject.complete();
    this.subject.error({code: 4000, reason: 'I think our app just broke!'});
  }

  listentoWebsocket(){
    this.subject.subscribe(
      msg => console.log('message received: ' + msg), // Called whenever there is a message from the server.
      err => console.log(err), // Called if at any point WebSocket API signals some kind of error.
      () => console.log('complete') // Called when connection is closed (for whatever reason).
    );
  }

}
