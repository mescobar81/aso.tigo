import { Component, OnInit } from '@angular/core';
import { MenuController, NavController, PopoverController } from '@ionic/angular';
import { PopoverInfoComponent } from 'src/app/components/popover-info/popover-info.component';
import { PopoverItem } from 'src/app/interfaces/interface';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  items:PopoverItem[] = [{
    id:1,
    title: 'Cerrar Sesión',
    route:'',
    icon:'log-out'
  },
  {
    id:2,
    title: 'Cambiar Contraseña',
    route:'',
    icon:''
  }
];
  constructor(private menuCtrl: MenuController,
              private popoverController:PopoverController,
              private storageSrv:StorageService,
              private navCtrl: NavController) { }

  ngOnInit() {
    this.mostrarMenu();
  }

  mostrarMenu(){
    this.menuCtrl.open('first');
  }

  async presentPopover(e: Event) {
    const popover = await this.popoverController.create({
      component: PopoverInfoComponent,
      event: e,
      componentProps:{
        items:this.items
      },
      animated:true,
      cssClass:'ion-popover'
    });

    await popover.present();
    
    const id =  (await popover.onWillDismiss()).data?.id || null; // ver: ? para evitar que no de undefine si no hay dato

    if(id === 1) {//cerrar sesion
      this.storageSrv.clear();
      this.navCtrl.navigateRoot('login');
    }
    if(id === 2){//cambiar contraseña
      //TO DO: llamar a pantalla cambiar contraseña
    }

  }
}
