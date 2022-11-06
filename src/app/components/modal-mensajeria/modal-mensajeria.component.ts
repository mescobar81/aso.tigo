import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-mensajeria',
  templateUrl: './modal-mensajeria.component.html',
  styleUrls: ['./modal-mensajeria.component.scss'],
})
export class ModalMensajeriaComponent {

  @Input()
  mensaje:string = '';
  constructor(private modalCtrl: ModalController) { }

  cancel(){
    return this.modalCtrl.dismiss(null, 'cancel');
  }
}
