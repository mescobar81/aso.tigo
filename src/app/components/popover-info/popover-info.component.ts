import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-popover-info',
  templateUrl: './popover-info.component.html',
  styleUrls: ['./popover-info.component.scss'],
})
export class PopoverInfoComponent implements OnInit {

  items:string[] = ['Cerrar Sesión', 'Cambiar Contraseña'];
  constructor(private storage:Storage,
              private navCtrl:NavController) {
    this.init();
   }

  async init(){
    await this.storage.create();
  }
  ngOnInit() {}

  async logout(){
    await this.storage.clear();
    this.navCtrl.navigateRoot('/login');
  }
}
