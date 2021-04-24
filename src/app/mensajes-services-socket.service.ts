import { Injectable } from '@angular/core';
import { webSocket } from "rxjs/webSocket";

// Interfaz para la forma del objeto mensaje
interface Mensaje {
	latitude: string;
	longitude: string;
}

@Injectable({
  providedIn: 'root'
})
export class MensajesServicesSocketService {
  constructor() { } 
}
