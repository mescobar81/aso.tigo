import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { Usuario } from '../interfaces/interface';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  usuario:any;
  constructor(private storage:Storage) { 
    this.init();
  }

  get getUsuario(){
    return {...this.usuario};
  }

  async init(){
    await this.storage.create();
  }

  async setUsuario() {
    this.usuario = await this.storage.get('usuario') || null;
  }
}
