import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment';
import { ResponseMovimientoBR } from '../interfaces/interface';

const urlBase = environment.urlBase;
@Injectable({
  providedIn: 'root'
})
export class MovimientoBRService {

  constructor(private http: HttpClient,
              private storage:Storage) { 
                this.init();
              }

  async init(){
    await this.storage.create();
  }


  async listarMovimientoBR(mes:number, anho:number): Promise<ResponseMovimientoBR> {
    const data = await this.storage.get('usuario') || null;

    if(!data){
      return;
    }
    
    return new Promise(resolve => {
      this.http.get<ResponseMovimientoBR>(`${urlBase}/movimientosBr?nroDocumento=${data.usuario.documento}&mes=${mes}&anho=${anho}`)
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
