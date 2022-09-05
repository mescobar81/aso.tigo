import { Component, OnInit } from '@angular/core';
import { MenuController, PopoverController } from '@ionic/angular';
import { PopoverInfoComponent } from 'src/app/components/popover-info/popover-info.component';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  roleMsg:string;
  constructor(private menuCtrl: MenuController,
              private popoverController:PopoverController) { }

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
    });

    await popover.present();

    const { role } = await popover.onDidDismiss();
    this.roleMsg = `Popover dismissed with role: ${role}`;
    
  }
}
