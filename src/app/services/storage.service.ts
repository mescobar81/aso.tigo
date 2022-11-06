import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { Usuario } from '../interfaces/interface';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  usuario:Usuario;
  token:string = '';
  nroSolicitud:string;
  constructor(private storage:Storage) { 
    this.init();
  }

  async getUsuario(){
    this.usuario = await this.storage.get('usuario') || null;
    return this.usuario;
  }

  async getToken(){
    this.token = await this.storage.get('token');
    return this.token;
  }

  async getNroSolicitud(){
    this.nroSolicitud = await this.storage.get('nroSolicitud');
    return this.nroSolicitud;
  }

  async init(){   
    await this.storage.create();
  }

  /**
   * graba usuario en el local storage
   * @param usuario 
   */
  async guardarUsuario(usuario:Usuario){
    await this.storage.set('usuario', usuario);
  }

  async guardarToken(token:string){
    await this.storage.set('token', token);
  }

  async guardarNroSolicitud(nroSolicitud:Number){
    await this.storage.set('nroSolicitud', nroSolicitud);
  }
  /**
   * limpia el local storage
   */
  clear(){
    this.storage.clear();
  }
}
