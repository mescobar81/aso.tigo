import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { OrdenSolicitada, ResponseCasaComercial, ResponseFormaDePago, ResponseOrdenByRol, ResponseOrdenLeido, ResponseOrdenPendiente, ResponseOrdenRechazada, ResponseSolicitudOrden, ResponseStatusOrden } from '../interfaces/interface';

const urlBase = environment.urlBase;
@Injectable({
  providedIn: 'root'
})
export class SolicitudOrdenService {

  constructor(private http:HttpClient) { }


  /**
   * lista las casas comericiales
   * @param localidad extrae por localidad
   * @returns 
   */
  listarCasasComerciales(localidad:number):Promise<ResponseCasaComercial>{

    return new Promise((resolve, reject) => {

      this.http.get<ResponseCasaComercial>(`${urlBase}/casaComercial?localidad=${localidad}`).subscribe(resp =>{
          if(resp.status === 'success'){
            resolve(resp);
          }
      },err => {
        console.log(JSON.stringify(err));
        reject(err);
      })
    });
  }

  /**
   * lista las formas de pago
   * @returns 
   */
  listarFormasDePagos():Promise<ResponseFormaDePago>{
    
    return new Promise<ResponseFormaDePago>((resolve, reject) =>{
      this.http.get<ResponseFormaDePago>(`${urlBase}/formasPago`).subscribe(resp =>{
        if(resp.status === 'success'){
          resolve(resp);
        }
      }, err =>{
        console.log(JSON.stringify(err));
        reject(err);
      });
    });
  }

  enviarSolicitudOrden(orden:OrdenSolicitada):Promise<ResponseSolicitudOrden>{

    return new Promise<ResponseSolicitudOrden>((resolve, reject) =>{
      this.http.put<ResponseSolicitudOrden>(`${urlBase}/solicitudOrden`, orden).subscribe(resp =>{
        if(resp.codigoRespuesta === '00'){
          resolve(resp);
        }else if(resp.codigoRespuesta == '99'){
          resolve(resp);
        }else if(resp.status == 'failure'){
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

  enviarSolicitudAprobadoRechazado(solicitud:any):Promise<ResponseStatusOrden>{
    return new Promise((resolve,reject) =>{
      this.http.put<ResponseStatusOrden>(`${urlBase}/responderSolicitudOrden`, solicitud).subscribe(resp =>{
        if(resp.status === 'success'){
          resolve(resp);
        }else{
          resolve(resp);
        }
      },err =>{
        console.log(JSON.stringify(err));
        reject(err);
      });
    });
  }

  listarOrdenesPendientesByRol(rol:string):Promise<ResponseOrdenByRol>{
    return new Promise<ResponseOrdenByRol>((resolve, reject) =>{
      this.http.get<ResponseOrdenByRol>(`${urlBase}/solicitudesPendientes?rol=${rol}`).subscribe(resp =>{
        if(resp.status === 'success'){
          resolve(resp);
        }else{
          resolve(resp);
        }
      }, err =>{
        console.log(JSON.stringify(err));
        reject(err);
      });
    });
  }

  listarOrdenesPendientes(nroSocio:string):Promise<ResponseOrdenPendiente>{
    return new Promise<ResponseOrdenPendiente>((resolve, reject) =>{
      this.http.get<ResponseOrdenPendiente>(`${urlBase}/misOrdenesPendientes?nroSocio=${nroSocio}`).subscribe(resp =>{
        if(resp.status === 'success'){
          resolve(resp);
        }else{
          console.log(JSON.stringify(resp));
        }
      },err =>{reject(JSON.stringify(err))});
    })
  }

  listarOrdenesRechazadas(nroSocio:string):Promise<ResponseOrdenRechazada> {

    return new Promise<ResponseOrdenRechazada>((resolve, reject) => {
      this.http.get<ResponseOrdenRechazada>(`${urlBase}/misOrdenesCanceladas?nroSocio=${nroSocio}`).subscribe(resp =>{
        if(resp.status === 'success'){
          resolve(resp);
        }else{
          console.log(JSON.stringify(resp));
          resolve(resp);
        }
      }, err => {
        console.log(JSON.stringify(err));
        
        reject(err);})
    })
  }

  marcarOrdenLeido(documento:string, nroRegistro:number): Promise<boolean>{

    return new Promise<boolean>((resolve, reject) =>{
      this.http.post<ResponseOrdenLeido>(`${urlBase}/leerRechazoOrden`, {documento, nroRegistro}).subscribe(resp =>{
        if(resp.status === 'success'){
          resolve(true);
        }else{
          console.log(JSON.stringify(resp));
        }
      }, err => {
        console.log(JSON.stringify(err));
        reject(false);
      });
    });
  }
}
