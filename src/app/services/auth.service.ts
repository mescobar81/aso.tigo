import {  Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ResponseUsuario, Usuario, UsuarioRequest } from '../interfaces/interface';
import { Storage } from '@ionic/storage-angular';



const urlBase = environment.urlBase;
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _storage:Storage | null = null;
  constructor(private http:HttpClient,
              private storage:Storage) {
               
                this.init();
               
              }
  async init(){
    this._storage = await this.storage.create();
  }

   login(usuario:UsuarioRequest):Promise<ResponseUsuario> {

    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json; charset=utf-8');

    return new Promise<ResponseUsuario>((resolve) => {
       this.http.post<ResponseUsuario>(`${urlBase}/loginPost/`, usuario, {headers}).subscribe(resp =>{
        console.log("EN login ", resp);
        
        if(resp.usuario.valido){
          this._storage.set('usuario', resp);
          resolve(resp);
        }else{
          resolve(resp);
        }
      }, err => console.log(err)
      )
    })
  }

  /**
   * valida en el sessionStorage que un usuario este activo
   * @returns 
   */
   async validarUsuario():Promise<boolean> {

    //espera a cargar el usuario del sessionStorage
    const data:ResponseUsuario = await this.storage.get('usuario') || null;

    if(!data){
      console.log("ERROR: en lectura usuario sessionStorage", data);
      return Promise.resolve(false);
    }else{
      return Promise.resolve(true);
    }
  }
}
