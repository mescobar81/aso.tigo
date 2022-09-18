import { Component, OnInit } from '@angular/core';

import { MenuItem, Usuario } from 'src/app/interfaces/interface';
import { MenuService } from 'src/app/services/menu.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  menuOpc!:MenuItem;
  usuario!: Usuario;
  constructor(private menuSvr:MenuService,
              private storageSrv: StorageService) {
               }

  async ngOnInit() {
    
    const usuario = await this.storageSrv.getUsuario();
    
    if (!usuario) {
      return;
    }
    const rol: string = usuario.rol.roles[0].toLowerCase();
    //espera a obtener las opciones del menu
    this.menuOpc = await this.menuSvr.getMenuOpcion(rol);
  }
  
  get getUsuario(){
    this.menuSvr.event.subscribe(usuario =>{
      this.usuario = usuario;
    });  
    return this.usuario;
  }

}
