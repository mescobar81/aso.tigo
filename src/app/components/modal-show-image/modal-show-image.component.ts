import { Component, Input } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-modal-show-image',
  templateUrl: './modal-show-image.component.html',
  styleUrls: ['./modal-show-image.component.scss'],
})
export class ModalShowImageComponent {

  @Input() image:any = null;
  backButton = null;
  constructor(private modalCtrl:ModalController,
             private platform:Platform) { }


  ionViewDidEnter() {
    this.backButton = this.platform.backButton.subscribeWithPriority(9999, () => {
    });
    }

    /**
     * desactiva la navegacion del boton atras fisico del dispositivo
     */
    ionViewWillLeave() {
        this.backButton.unsubscribe();
    }

  cerrar(){
    this.modalCtrl.dismiss(null, 'cerrar');
  }

}
