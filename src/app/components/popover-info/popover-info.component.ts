import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-popover-info',
  templateUrl: './popover-info.component.html',
  styleUrls: ['./popover-info.component.scss'],
})
export class PopoverInfoComponent implements OnInit {

  items:string[] = ['Cerrar Sesión', 'Cambiar Contraseña'];
  constructor(private storageSrv:StorageService,
              private navCtrl:NavController) {
   }

  ngOnInit() {}

   logout(){
    this.storageSrv.clear();
    this.navCtrl.navigateRoot('/login');
  }
}
