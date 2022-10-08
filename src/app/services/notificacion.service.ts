import { Injectable } from '@angular/core';
import { ModalController, NavController, Platform } from '@ionic/angular';

import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token,
} from '@capacitor/push-notifications';

import { StorageService } from './storage.service';
import { ModalNotificacionComponent } from '../components/modal-notificacion/modal-notificacion.component';


@Injectable({
  providedIn: 'root'
})
export class NotificacionService {

  constructor(private platform: Platform,
              private navCtrl: NavController,
              private modalCtrl: ModalController,
              private storageSrv: StorageService) { 
    this.init();
  }

  /**
   * inicializa los servicios del pushNotifications
   */
  init(){

    if(this.platform.is('capacitor')){
      PushNotifications.requestPermissions().then(result => {
        if(result.receive === 'granted'){
          //registramos permisos para recibir notificaciones
          PushNotifications.register();
          //agregamos los oyentes
          this.addListeners();
        }else{
          console.log(JSON.stringify(result));  
        }
      });
    }else{
      console.log('PushNotification --> No estas ejecutando la aplicación en un dispositivo móvil');
    }
  }

   addListeners(){
    
    // On success, we should be able to receive notifications
    PushNotifications.addListener('registration',
      (token: Token) => {
        console.log('Push registration success, token:', token.value);
      }
    );

    // Some issue with our setup and push will not work
    PushNotifications.addListener('registrationError',
      (error: any) => {
        console.log('Error on registration: ' , JSON.parse(error));
      }
    );

    // Show us the notification payload if the app is open on our device
    PushNotifications.addListener('pushNotificationReceived',
      async (notification: PushNotificationSchema) => {
        const usuario = await this.storageSrv.getUsuario() || null;
        if(!usuario){
          return;
        }
        this.openModal(notification);
        console.log('Push received: ' + JSON.stringify(notification));
      }
    );

    // Method called when tapping on a notification
      PushNotifications.addListener('pushNotificationActionPerformed',
      async (notification:ActionPerformed) => {
        const usuario = await this.storageSrv.getUsuario() || null;
        if(!usuario){
          return;
        }
        console.log('Push action performed: ', notification.actionId ,notification.notification.data);

        if(usuario.rol.roles[0].toLowerCase() === 'presidente' || usuario.rol.roles[0].toLowerCase() === 'tesorero'){
          this.navCtrl.navigateRoot('/inicio/aprobar-rechazar-orden');
        }
      }
    );
  }

  /**
   * abre el modal de notificaciones para mostar el mensaje al usuario
   * @param notification 
   */
  async openModal(notification:PushNotificationSchema){

    const modal = await this.modalCtrl.create({
      component: ModalNotificacionComponent,
      componentProps:{
        notification
      }
    });

    modal.present();
  }
}
