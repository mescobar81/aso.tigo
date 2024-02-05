import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { ResponseSolicitudTicket, 
  ResponseTicketSuccess,
   ResponseTicketsAbierto, 
   ResponseStatusResponderTicket, 
   ResponseStatusMessage,
   ResponseCalificacionTicket } from '../interfaces/interface';

const urlBase = environment.urlBase;
@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private http:HttpClient) { }


  listarTipoSolicitud():Promise<ResponseSolicitudTicket>{
    return new Promise<ResponseSolicitudTicket>((resolve, reject) => {
      this.http.get<ResponseSolicitudTicket>(`${urlBase}/tiposSolicitudTicket`).subscribe(resp =>{
        if(resp.status === 'success'){
          resolve(resp);
        }else{
          console.log(JSON.stringify(resp));
        }
      }, err => {
        console.log(JSON.stringify(err));
        reject(err);
      });
    });
  }

   enviarSolicitud(formData:FormData):Promise<ResponseTicketSuccess>{

    return new Promise<ResponseTicketSuccess>((resolve, reject) => {
      this.http.post<ResponseTicketSuccess>(`${urlBase}/nuevoTicket`, formData).subscribe(resp =>{
        resolve(resp);
      }, (err) => {
        reject(err);
      });
    });
  }

  
  obtenerTicketsAbierto(documento:number):Promise<ResponseTicketsAbierto>{
    return new Promise<any>((resolve, reject) => {
      this.http.get(`${urlBase}/misTicketsAbiertos?documento=${documento}`).subscribe(
        (resp:ResponseTicketsAbierto)=>{
          resolve(resp);
        }, err => {
          console.log(JSON.stringify(err));
          reject(err);
        });
    });
  }

  responderTicket(formData:FormData):Promise<ResponseStatusResponderTicket>{
    return new Promise((resolve, reject) => {
      this.http.post<ResponseStatusResponderTicket>(`${urlBase}/responderTicket`, formData).subscribe(res => {
        if(res.status === 'success'){
          resolve(res);
        }else {
          resolve(res);
        }
      }, err => {
        console.log(JSON.stringify(err));
        reject(err);
      });
    });
  }

  cerrarTicket(ticket:any):Promise<ResponseStatusMessage>{
    return new Promise((resolve, reject) => {
      this.http.post<ResponseStatusMessage>(`${urlBase}/cerrarTicket`, ticket).subscribe(res => {
        if(res.status === 'success'){
          resolve(res);
        }else {
          resolve(res);
        }
      }, err => {
        console.log(JSON.stringify(err));
        reject(err);        
      });
    });
  }
  
  obtenerCalificacionTicket():Promise<ResponseCalificacionTicket>{
    return new Promise((resolve, reject) => {
      this.http.get<ResponseCalificacionTicket>(`${urlBase}/obtenerCalificacion`).subscribe(res => {
        if(res.status === 'success'){
          resolve(res);
        }else {
          resolve(res);
        }
      }, err => {
        console.log(JSON.stringify(err));
        reject(err);
      });
    });
  }
}
