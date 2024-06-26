import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';

import { MenuItem, Usuario } from '../interfaces/interface';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  @Output() event:EventEmitter<Usuario> = new EventEmitter();

  usuario: Usuario;
  constructor(private http: HttpClient,
    private storageSvr: StorageService) {
  }

  async getMenuOpcion(rol:string): Promise<MenuItem> {

    const pathMenuOpcion = '/assets/menu-opc';

    this.usuario = await this.storageSvr.getUsuario();

    this.event.emit(this.usuario);

    return new Promise((resolve) => {

      if (rol === 'socio') {
        this.http.get<MenuItem>(`${pathMenuOpcion}/socio-opc.json`).subscribe(resp => {
          resolve(resp);
        }, err => {
          console.log("ERROR: en obtener opciones de menú", JSON.stringify(err));
        });
      } else if (rol === 'tesorero') {
        this.http.get<MenuItem>(`${pathMenuOpcion}/tesorero-opc.json`).subscribe(resp => {
          resolve(resp);
        }, err => {
          console.log("ERROR: en obtener opciones de menú", JSON.stringify(err));
        });
      }else if(rol === 'presidente'){
        this.http.get<MenuItem>(`${pathMenuOpcion}/presidente-opc.json`).subscribe(resp => {
          resolve(resp);
        }, err => {
          console.log("ERROR: en obtener opciones de menú", JSON.stringify(err));
        });
      }
    });
  }
}
