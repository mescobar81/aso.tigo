import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Device } from '@awesome-cordova-plugins/device/ngx';
import { LoadingController, MenuController, ModalController, NavController, ToastController } from '@ionic/angular';
import * as CryptoJS from 'crypto-js';
import { ModalInfoComponent } from 'src/app/components/modal-info/modal-info.component';

import { UsuarioRequest } from 'src/app/interfaces/interface';
import { AlertPresentService } from 'src/app/services/alert-present.service';
import { AuthService } from 'src/app/services/auth.service';
import { NotificacionService } from 'src/app/services/notificacion.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  typeInput:string = 'password';
  nameIcon:string = 'eye';
  passwordToggleIcon:boolean = false;
  usuario: UsuarioRequest = {
    documento: "",
    clave: "",
    device: {
      os: '',
      version: '',
      model: '',
      ip: ''
    },
    recordarSesion:false,
    notificacion:{
      idTokenFirebase:''
    }
  };
  constructor(private authSvr: AuthService,
    private notificationService: NotificacionService,
    private menuCtrl: MenuController,
    private navCtrl: NavController,
    private storageSrv: StorageService,
    private device: Device,
    private alertSvr: AlertPresentService,
    private modalCtrl: ModalController,
    private toastCtrl: ToastController,
    private loadingCtrl:LoadingController) { 
      this.notificationService.init();
      
    }

  /**
   * se encarga de llamar al servicio para dar ingreso al usuario
   * @param fLogin valores del formulario
   * @returns 
   */
  async login(fLogin: NgForm) {
    if (!fLogin.valid) {
      this.presentToast('bottom');
      return;
    }

    const token = await this.storageSrv.getToken();

    /**
     * crea un nuevo usuario en una constante para evitar modificaciones
     * en el template, detalles visuales para el usuario
     */
    const nuevoUsuario: UsuarioRequest = {
      documento: this.usuario.documento.toString(),
      //encripta la clave usando librerias externas de javascript
      clave: CryptoJS.SHA256(this.usuario.clave).toString(CryptoJS.enc.Hex),
      device: {
        os: this.device.platform,
        version: this.device.version,
        model: this.device.model,
        ip: '',//this.device.uuid
      },
      recordarSesion:this.usuario.recordarSesion,
      notificacion:{
        idTokenFirebase:token
      }
    }
    this.showLoading('Aguarde. Ingresando...');
    this.authSvr.login(nuevoUsuario).then(response => {
      if (!response.usuario.valido) {
        this.alertSvr.presentAlert("Atención", "", response.usuario.mensaje, "Aceptar");
      } else {
        this.storageSrv.guardarUsuario(response.usuario);//guarda los datos del usuario en el local storage
        this.navCtrl.navigateRoot('inicio');//llama a la pantalla incio
        this.menuCtrl.open('first');//llama al menu
      }
      this.loadingCtrl.dismiss();
    }).catch(err => {
      console.log('ERROR: ', JSON.stringify(err));
      this.presentarModal('ERROR',err.message,false);
      this.loadingCtrl.dismiss();
    });
    
  }

  async presentToast(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastCtrl.create({
      message: '¡Favor ingresar sus credenciales!',
      duration: 2200,
      position: position,
      icon:'information-circle',
      cssClass:'custom-toast'
    });

    await toast.present();
  }

  toggleShow(){
    this.passwordToggleIcon = !this.passwordToggleIcon;
    if(this.passwordToggleIcon){
      this.typeInput = 'text';
      this.nameIcon = 'eye-off';
    }else{
      this.typeInput = 'password';
      this.nameIcon = 'eye';
    }
  }
  async presentarModal(title: string, descripcion: string, isCss: boolean) {
    const modal = await this.modalCtrl.create({
      component: ModalInfoComponent,
      componentProps: {
        descripcion,
        title,
        isCss
      }
    });

    await modal.present();
  }

  async showLoading(mensaje: string) {
    const loading = await this.loadingCtrl.create({
      message: mensaje,
      //duration: 4000,
      spinner: 'bubbles',
      cssClass: 'custom-loading',
    });

    loading.present();
  }
}
