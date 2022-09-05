import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { OrdenSolicitada, ResponseCasaComercial, ResponseFormaDePago, ResponseSolicitudOrden } from '../interfaces/interface';

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
      });
    });
  }

  enviarSolicitudOrden(orden:OrdenSolicitada):Promise<ResponseSolicitudOrden>{

    return new Promise<any>((resolve, reject) =>{
      this.http.put<ResponseSolicitudOrden>(`${urlBase}/solicitudOrden`, orden).subscribe(resp =>{
        if(resp.codigoRespuesta === '00'){
          resolve(resp);
        }else{
          resolve(resp);
        }
      }, err => {
        console.log(JSON.stringify(err));
        reject(err);
      });
    });
  }
}
