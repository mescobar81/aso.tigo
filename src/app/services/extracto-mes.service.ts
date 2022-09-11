import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import {map} from 'rxjs/operators'
import { Observable } from 'rxjs';

import { ResponseCiclosCerrado, ResponseMesAbierto, ResponseMesCerrado } from '../interfaces/interface';
import { StorageService } from './storage.service';


const urlBase = environment.urlBase;
@Injectable({
  providedIn: 'root'
})
export class ExtractoMesService {

  constructor(private http: HttpClient,
              private storageSrv:StorageService) { 

              }
  async getMesAbierto(): Promise<ResponseMesAbierto> {

    const usuario = await this.storageSrv.getUsuario();
    if(!usuario){
      return;
    }

    return new Promise((resolve, reject) => {
      this.http.get<ResponseMesAbierto>(`${urlBase}/mesAbierto?nroSocio=${usuario.nroSocio}`).subscribe(resp =>{
        if(resp.status === 'success'){
          resolve(resp);
        }
        //TO DO: VER QUE VIENE DEL SERVICIO SI NO ES SUCCESS
      }, err =>{
        reject(err);
      })
    });
  }

  /**
   * devuelve el historial del ciclo, mes cerrado
   */
  async getMesCerrado(params:any):Promise<ResponseMesCerrado> {
    const usuario = await this.storageSrv.getUsuario();
    if(!usuario){
      return;
    }
    const {mes,anho} = params;
    console.log(usuario.nroSocio);
    
    return new Promise((resolve, reject) => {
      this.http.get<ResponseMesCerrado>(`${urlBase}/mesCerrado?nroSocio=${usuario.nroSocio}&mes=${mes}&anho=${anho}`).subscribe(resp => {
        if (resp.status == 'success') {
          resolve(resp);
        }
      }, err =>{
        console.log(JSON.stringify(err));
        reject(err);
      });
    });
  }

  /**
   * devuelve un arreglo con el mes y el año
   * @returns 
   */
  getCiclosCerrados():Observable<ResponseCiclosCerrado>{

    return this.http.get<ResponseCiclosCerrado>(`${urlBase}/ciclosCerrados`).pipe(
      map(resp =>{
        if(resp.status === 'success'){
          return resp;
        }else{
          console.log(resp.mensaje);
        }
      })
    );
  }
}
