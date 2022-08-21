import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Observable } from 'rxjs';
import { MenuItem, Usuario } from '../interfaces/interface';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  usuario: Usuario;
  get getUsuario() {
    return { ...this.usuario };
  }
  constructor(private http: HttpClient,
    private storage: Storage) {
    this.init();
  }

  /**
   * crea la bd local en el dispositivo
   * ver: almacenamiento temporal en el session storage
   */
  async init() {
    await this.storage.create();
  }
  async getMenuOpcion():Observable<MenuItem> {
    const pathAssets = '/assets/menu-opc';
    const usuario: Usuario = await this.storage.get('usuario');

    
    if (usuario != null) {
      
    }
    const rol: string = usuario.rol.roles[0].toLowerCase();
    if (rol === 'socio') {
      return this.http.get<MenuItem>(`${pathAssets}/socio-opc.json`);
    } else if (rol === 'tesorero') {
      return this.http.get<MenuItem>(`${pathAssets}/tesorero-opc.json`);
    }
  }

  async setDataUsuario() {
    this.usuario = await this.storage.get('usuario');
  }
}
