import { Component, OnInit } from '@angular/core';
import { MenuItem, Usuario } from 'src/app/interfaces/interface';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  menuOpc!:MenuItem;
  constructor(private menuSvr:MenuService) { }

  async ngOnInit() {

    (await this.menuSvr.getMenuOpcion()).subscribe(menuOpc =>{
      this.menuOpc = menuOpc;
    });

    /**
     * establece los datos del usuario
     * ver:lee del session storage
     */
    this.menuSvr.setDataUsuario();
  }

  get getUsuario(){
    return this.menuSvr.getUsuario;
  }

}
