import { Injectable } from '@angular/core';

// @ts-ignore
import * as clientData from "../../assets/json/clients.json";

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  clients: any = (clientData as any).default;

  constructor() {
  }

  getClients() {
    return this.clients;
  }

}
