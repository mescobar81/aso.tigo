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

  async getMenuOpcion(rol:string): Promise<MenuItem> {

    const pathAssets = '/assets/menu-opc';

    this.usuario = await this.storage.get('usuario');

    this.event.emit(this.usuario);

    return new Promise((resolve) => {

      if (rol === 'socio') {
        this.http.get<MenuItem>(`${pathAssets}/socio-opc.json`).subscribe(resp => {
          resolve(resp);
        }, err => {
          console.log("ERROR: en obtener opciones de menú", JSON.stringify(err));
        });
      } else if (rol === 'tesorero') {
        this.http.get<MenuItem>(`${pathAssets}/tesorero-opc.json`);
      }
    });
  }
}
