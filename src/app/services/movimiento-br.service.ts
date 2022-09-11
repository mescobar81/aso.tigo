import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { ResponseMovimientoBR } from '../interfaces/interface';
import { StorageService } from './storage.service';

const urlBase = environment.urlBase;
@Injectable({
  providedIn: 'root'
})
export class MovimientoBRService {

  constructor(private http: HttpClient,
              private storageSrv:StorageService) { 
              }


  async listarMovimientoBR(mes:number, anho:number): Promise<ResponseMovimientoBR> {
    
    const usuario = await this.storageSrv.getUsuario();

    if(!usuario){
      return;
    }
    
    return new Promise(resolve => {
      this.http.get<ResponseMovimientoBR>(`${urlBase}/movimientosBr?nroDocumento=${usuario.documento}&mes=${mes}&anho=${anho}`)
      .subscribe(resp =>{
        if(resp.status === 'success'){
           resolve(resp);
        }else{
          resolve(resp);
        }
      }, err => {
        console.log(JSON.stringify(err));
        
      });
    });
  }
}
