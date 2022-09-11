import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { Usuario } from '../interfaces/interface';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  usuario:Usuario;
  constructor(private storage:Storage) { 
    this.init();
  }

  async getUsuario(){
    this.usuario = await this.storage.get('usuario') || null;
    return this.usuario;
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

  /**
   * limpia el local storage
   */
  clear(){
    this.storage.clear();
  }
}
