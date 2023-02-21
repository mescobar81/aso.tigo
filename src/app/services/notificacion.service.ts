import { Injectable } from '@angular/core';
import { ModalController, NavController, Platform } from '@ionic/angular';

import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token
} from '@capacitor/push-notifications';

import { StorageService } from './storage.service';
import { ModalNotificacionComponent } from '../components/modal-notificacion/modal-notificacion.component';
import { ModalMensajeriaComponent } from '../components/modal-mensajeria/modal-mensajeria.component';

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
        this.storageSrv.guardarToken(token.value);
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
          this.navCtrl.navigateRoot('/login');
          return;
        }

        console.log('Push received: ' + JSON.stringify(notification));
        const {pantallaAbrir} = notification.data;
        //TODO: llamar a la pantalla de aprobar-rechazar-orden si es rol presidente y tesorero
        if(usuario.rol.roles[0].toLowerCase() === 'presidente' || usuario.rol.roles[0].toLowerCase() === 'tesorero'){
          this.openModal(notification);
        }else if(usuario.rol.roles[0].toLowerCase() === 'socio'){
          if(pantallaAbrir === 'HOME'){
            this.navCtrl.navigateRoot('/inicio');
          }else if(pantallaAbrir.toString().toLowerCase() === 'cotizar_plan_seguro_medico'){
            this.navCtrl.navigateRoot('inicio/cotizar-plan/""/0');
          }else if(pantallaAbrir.toString().toLowerCase() === 'mis-tickets'){
            //TODO: llama a una pantalla mis tickets abiertos
          }else if(pantallaAbrir.toString().toLowerCase() === 'rechazo_asismed'){
            //TODO: llama a una pantalla modal - mensajeria
          }
        }
      }
    );

    // Method called when tapping on a notification
      PushNotifications.addListener('pushNotificationActionPerformed',
      async (notification:ActionPerformed) => {
        const usuario = await this.storageSrv.getUsuario() || null;
        if(!usuario){
          //llamar al login
          return;
        }
        
        console.log('Push action performed: ', notification.actionId ,notification.notification.data);
        const {pantallaAbrir, mensaje} = notification.notification.data;
        if(usuario.rol.roles[0].toLowerCase() === 'presidente' || usuario.rol.roles[0].toLowerCase() === 'tesorero'){
          this.navCtrl.navigateRoot('/inicio/aprobar-rechazar-orden');
        }else if(usuario.rol.roles[0].toLowerCase() === 'socio'){
          if(pantallaAbrir === 'HOME'){
            this.navCtrl.navigateRoot('/inicio');
          }else if(pantallaAbrir.toString().toLowerCase() === 'cotizar_plan_seguro_medico'){
            this.navCtrl.navigateRoot('inicio/cotizar-plan/""/0');
          }else if(pantallaAbrir.toString().toLowerCase() === 'mis-tickets'){
            //TODO: llama a una pantalla mis tickets abiertos falta desarrollo
          }else if(pantallaAbrir.toString().toLowerCase() === 'rechazo_asismed'){
            this.openModalMensajeria(notification.notification.data.mensaje.descripcionCorta)
          }
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

    await modal.present();
    const {role} = await modal.onWillDismiss();
    if(role === 'cancel'){
      this.navCtrl.navigateRoot('/inicio/aprobar-rechazar-orden');
    }
  }

  async openModalMensajeria(mensaje:any){

    const modal = await this.modalCtrl.create({
      component: ModalMensajeriaComponent,
      componentProps:{
        mensaje
      }
    });

    await modal.present();
  }
}
