import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ResponseSolicitudTicket } from '../interfaces/interface';

const urlBase = environment.urlBase;
@Injectable({
  providedIn: 'root'
})
export class CreaTicketService {

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

  enviarSolicitud():Promise<any>{
    return new Promise<any>((resolve, reject) => {

    });
  }
}
