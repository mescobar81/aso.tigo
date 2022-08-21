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


    return new Promise((resolve) => {
       this.http.post<ResponseUsuario>(`${urlBase}/loginPost/`, usuario, {headers}).subscribe(resp =>{
        if(resp.usuario.valido){
          this._storage.set('usuario', resp.usuario);
          resolve(resp);
        }else{
          resolve(resp);
        }
      })
    })
  }

  /**
   * valida en el sessionStorage que un usuario este activo
   * @returns 
   */
  async validarUsuario():Promise<boolean> {
    const usuario:Usuario = await this.storage.get('usuario');

    if(usuario == null){
      console.log("Usuario vacio en sessionStorge");
      return;
    }
    return usuario.valido;
  }
}
