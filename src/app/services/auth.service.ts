import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { RequestCambioContraseña, ResponseClaveModificada, ResponseUsuario, UsuarioRequest } from '../interfaces/interface';
import { StorageService } from './storage.service';



const urlBase = environment.urlBase;
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,
    private storageSrv: StorageService) {
  }

  login(usuario: UsuarioRequest): Promise<ResponseUsuario> {

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json; charset=utf-8');

    return new Promise<ResponseUsuario>((resolve, reject) => {
      this.http.post<ResponseUsuario>(`${urlBase}/loginPost/`, usuario, { headers }).subscribe(resp => {
        resolve(resp);
      }, err => {
        reject(err);
      }
      )
    })
  }

  /**
   * valida en el sessionStorage que un usuario este activo
   * @returns 
   */
  async validarUsuario(): Promise<boolean> {

    /**
     * crea el almacenamiento local
     * ver: si no se coloca esta linea la primera vez el usuario es null
     */
    await this.storageSrv.init();

    const usuario = await this.storageSrv.getUsuario();

    if (!usuario) {
      return Promise.resolve(false);
    } else {
      return Promise.resolve(true);
    }

  }

  cambiarContraseña(cambioClave:RequestCambioContraseña):Promise<ResponseClaveModificada>{

    return new Promise<ResponseClaveModificada>((resolve,reject) => {
      this.http.post<ResponseClaveModificada>(`${urlBase}/cambioPasswordAsociado`, cambioClave).subscribe(resp =>{
        if(resp.status === 'success'){
          resolve(resp);
        }else{
          resolve(resp);
        }
      }, err => {
        console.error("ERROR: ", JSON.stringify(err));
        reject(err);   
      });

    })
  }
}
