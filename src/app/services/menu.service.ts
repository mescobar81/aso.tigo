import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

import { MenuItem, ResponseUsuario } from '../interfaces/interface';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  @Output() event:EventEmitter<ResponseUsuario> = new EventEmitter();

  usuario: ResponseUsuario;
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
    this.usuario = await this.storage.get('usuario');
    this.event.emit(this.usuario);
  }


  async getMenuOpcion(rol:string): Promise<MenuItem> {

    const pathAssets = '/assets/menu-opc';

    return new Promise(async (resolve) => {

      if (rol === 'socio') {
        this.http.get<MenuItem>(`${pathAssets}/socio-opc.json`).subscribe(resp => {
          resolve(resp);
        }, err => {
          console.log("ERROR: en obtener opciones de menú", err);
        });
      } else if (rol === 'tesorero') {
        this.http.get<MenuItem>(`${pathAssets}/tesorero-opc.json`);
      }

    });

  }
}
