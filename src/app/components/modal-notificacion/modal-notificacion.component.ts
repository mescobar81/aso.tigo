import { Component, Input, OnInit } from '@angular/core';
import { PushNotificationSchema } from '@capacitor/push-notifications';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-notificacion',
  templateUrl: './modal-notificacion.component.html',
  styleUrls: ['./modal-notificacion.component.scss'],
})
export class ModalNotificacionComponent implements OnInit {

  @Input() notification:PushNotificationSchema;
  constructor(private modalCtrl:ModalController) { }

  ngOnInit() {}

  cerrarModal(){
    this.modalCtrl.dismiss();
  }

}
