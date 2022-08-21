import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ResponseMesAbierto } from '../interfaces/interface';


const urlBase = environment.urlBase;
@Injectable({
  providedIn: 'root'
})
export class ExtractoMesService {

  constructor(private http: HttpClient) { }


  getMesAbierto(nroSocio: number): Promise<ResponseMesAbierto> {

    return new Promise((resolve, reject) => {
      this.http.get<ResponseMesAbierto>(`${urlBase}/mesAbierto?nroSocio=${nroSocio}`).subscribe(resp => {
        if (resp.status == 'success') {
          resolve(resp);
        }
      }
      );
    });
  }

  getMesCerrado():Promise<ResponseMesAbierto> {
    return new Promise((resolve, reject) => {
      this.http.get<ResponseMesAbierto>(`${urlBase}/mesAbierto?nroSocio=${114}`).subscribe(resp => {
        if (resp.status == 'success') {
          resolve(resp);
        }
      }
      );
    });
  }
}
