import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { MenuItem, ResponseUsuario } from 'src/app/interfaces/interface';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  menuOpc!:MenuItem;
  usuario!: ResponseUsuario;
  constructor(private menuSvr:MenuService,
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
  
  async ngOnInit() {

    const data = await this.storage.get('usuario') || null;

    if (!data) {
      return;
    }
    const rol: string = data.usuario.rol.roles[0].toLowerCase();

    //espera a obtener las opciones del menu
    this.menuOpc = await this.menuSvr.getMenuOpcion(rol);
  }
  
  get getUsuario(){
    this.menuSvr.event.subscribe(usuario =>{
      this.usuario = {...usuario};
    });  
    return this.usuario;
  }

}
