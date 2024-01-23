import { Injectable } from '@angular/core';
import { ModalController, NavController, Platform } from '@ionic/angular';

import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token
} from '@capacitor/push-notifications';

import { StorageService } from './storage.service';
import { ModalMensajeriaComponent } from '../components/modal-mensajeria/modal-mensajeria.component';
import { CoberturaMedicaService } from './cobertura-medica.service';

@Injectable({
  providedIn: 'root'
})
export class NotificacionService {


  constructor(private platform: Platform,
    private navCtrl: NavController,
    private modalCtrl: ModalController,
    private storageSrv: StorageService,
    private coberturaMedicaSvr: CoberturaMedicaService) {
    this.init();

  }

  /**
   * inicializa los servicios del pushNotifications
   */
  async init() {
    if (this.platform.is('capacitor')) {

      let permStatus = await PushNotifications.checkPermissions();

      if (permStatus.receive === 'prompt') {
        permStatus = await PushNotifications.requestPermissions();
      }

      if (permStatus.receive !== 'granted') {
        console.log(JSON.stringify('User denied permissions!'));
        throw new Error('User denied permissions!');
      }

      await PushNotifications.register();
      this.addListeners();
    } else {
      console.log('PushNotification --> No estas ejecutando la aplicación en un dispositivo móvil');
    }
    /*if(this.platform.is('capacitor')){
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
    }*/
  }

  addListeners() {

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
        console.log('No hay notificaciones para mostrar: ', JSON.parse(error));
      }
    );

    // Show us the notification payload if the app is open on our device
    PushNotifications.addListener('pushNotificationReceived',
      async (notification: PushNotificationSchema) => {
        const usuario = await this.storageSrv.getUsuario() || null;
        if (!usuario) {
          this.navCtrl.navigateRoot('/login');
          return;
        }
        console.log(notification);
        
        if (notification.data.data != null && notification.data.data != undefined) {
          const notificacionRecibida = JSON.parse(notification.data.data);

          const { pantallaAbrir, mensaje } = notificacionRecibida.notificacion;
          if (usuario.rol.roles[0].toLowerCase() === 'presidente' || usuario.rol.roles[0].toLowerCase() === 'tesorero') {
            this.navCtrl.navigateRoot('/inicio/aprobar-rechazar-orden');
          } else if (usuario.rol.roles[0].toLowerCase() === 'socio') {
            if (pantallaAbrir == 'HOME') {
              this.navCtrl.navigateRoot('/inicio');
            } else if (pantallaAbrir == 'COTIZAR_PLAN_SEGURO_MEDICO') {
              const validaInscripcion = await this.coberturaMedicaSvr.validaInsrcipcion(usuario.nroSocio);
              this.storageSrv.guardarValidaInscripcion(validaInscripcion);
              this.storageSrv.guardarNroSolicitud(validaInscripcion.nroSolicitud);
              this.navCtrl.navigateRoot('inicio/cotizar-plan');
            } else if (pantallaAbrir == 'MIS_TICKETS') {
              this.navCtrl.navigateRoot('inicio/tikets-abiertos');
            } else if (pantallaAbrir == 'RECHAZO_ASISMED') {
              this.openModalMensajeria(mensaje.descripcionCorta);
            }
          }
        } else {
          console.log('No hay notificaciones para mostrar: ', notification.data);

        }

      }
    );

    // Method called when tapping on a notification
    PushNotifications.addListener('pushNotificationActionPerformed',
      async (notification: ActionPerformed) => {
        const usuario = await this.storageSrv.getUsuario() || null;
        if (!usuario) {
          this.navCtrl.navigateRoot('/login');
          return;
        }
        console.log(notification.notification);
        
        if (notification.notification.data.data != null && notification.notification.data.data != undefined) {
          const notificacionRecibida = JSON.parse(notification.notification.data.data);

          const { pantallaAbrir, mensaje } = notificacionRecibida.notificacion;

          if (usuario.rol.roles[0].toLowerCase() === 'presidente' || usuario.rol.roles[0].toLowerCase() === 'tesorero') {
            this.navCtrl.navigateRoot('/inicio/aprobar-rechazar-orden');
          } else if (usuario.rol.roles[0].toLowerCase() === 'socio') {
            if (pantallaAbrir == 'HOME') {
              this.navCtrl.navigateRoot('/inicio');
            } else if (pantallaAbrir == 'COTIZAR_PLAN_SEGURO_MEDICO') {
              const validaInscripcion = await this.coberturaMedicaSvr.validaInsrcipcion(usuario.nroSocio);
              this.storageSrv.guardarValidaInscripcion(validaInscripcion);
              this.storageSrv.guardarNroSolicitud(validaInscripcion.nroSolicitud);
              this.navCtrl.navigateRoot('inicio/cotizar-plan');
            } else if (pantallaAbrir == 'MIS_TICKETS') {
              this.navCtrl.navigateRoot('inicio/tikets-abiertos');
            } else if (pantallaAbrir == 'RECHAZO_ASISMED') {
              this.openModalMensajeria(mensaje.descripcionCorta);
            }
          }
        }else{
          console.log('Error notificación: ', notification.notification.data);
        }

      }
    );
  }

  async openModalMensajeria(mensaje: any) {

    const modal = await this.modalCtrl.create({
      component: ModalMensajeriaComponent,
      componentProps: {
        mensaje
      }
    });

    await modal.present();

    const { role } = await modal.onWillDismiss();
    if (role === 'cancel') {
      this.navCtrl.navigateRoot('/inicio');
    }
  }
}
