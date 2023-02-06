import { Component, ContentChild, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertController, IonInput, ModalController, ToastController } from '@ionic/angular';
import * as CryptoJS from 'crypto-js';

import { ModalInfoComponent } from 'src/app/components/modal-info/modal-info.component';
import { RequestCambioContraseña } from 'src/app/interfaces/interface';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-cambiar-contrasenia',
  templateUrl: './cambiar-contrasenia.page.html',
  styleUrls: ['./cambiar-contrasenia.page.scss'],
})
export class CambiarContraseniaPage implements OnInit {

  showPassword = false;
  showPasswordNuevo = false;
  showPasswordConfirm = false;
  passwordToggleIconConfirm = 'eye';
  passwordToggleIcon = 'eye';
  passwordToggleIconNuevo = 'eye';

  typeInput = 'password';
@ContentChild(IonInput, {read: true}) input: IonInput;

  cambioClave: RequestCambioContraseña = {
    documento: '',
    claveActual: '',
    claveNueva: '',
    confirmacionClave: ''
  }
  oneye: boolean = false;
  constructor(private authSrv: AuthService,
    private modalCtrl: ModalController,
    private alertController:AlertController,
    private toastCtrl: ToastController) { }

  ngOnInit() {
  }

  async cambiarContrasenia(myForm: NgForm) {

    if (!myForm.valid) {
      this.presentToast('bottom');
      return;
    }

    const nuevaClave:RequestCambioContraseña = {
      documento: myForm.value.documento,
      claveActual: myForm.value.claveActual,
      claveNueva: myForm.value.claveNueva,
      confirmacionClave: myForm.value.confirmacionClave
    }

    if(nuevaClave.claveNueva !== nuevaClave.confirmacionClave){
      this.presentAlert();
      return;
    }

    //Actualiza la referencia a this.cambioClave
    this.cambioClave = {
      documento:nuevaClave.documento,
      claveActual: CryptoJS.SHA256(nuevaClave.claveActual).toString(CryptoJS.enc.Hex),
      claveNueva: CryptoJS.SHA256(nuevaClave.claveNueva).toString(CryptoJS.enc.Hex),
      confirmacionClave: CryptoJS.SHA256(nuevaClave.confirmacionClave).toString(CryptoJS.enc.Hex)
    }

    try {
      const { status, mensaje } = await this.authSrv.cambiarContraseña(this.cambioClave);
    
    if (status === 'success') {
      this.presentarModal('Cambio de Clave', mensaje, true);
    }else{
      this.presentarModal('Cambio de Clave', mensaje, false);  
    }
    } catch (error) {
      console.log(JSON.stringify(error));
      this.presentarModal('Cambio de clave', error, false);
    }
  }

  limpiarCampos(){
    this.cambioClave = {
      documento:'',
      claveActual: '',
      claveNueva: '',
      confirmacionClave: ''
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

    modal.present();
    const {role} = await modal.onWillDismiss();

    if(role === 'confirm'){
      this.limpiarCampos();
    }
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Atención',
      message: 'Las claves ingresadas no son iguales. ¡Favor verifique!',
      buttons: ['Aceptar'],
    });

    await alert.present();
  }

  async presentToast(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastCtrl.create({
      message: '¡Favor ingresar todos los campos!',
      duration: 2200,
      position: position,
      icon:'warning',
      cssClass:'custom-toast'
    });

    await toast.present();
  }

  toggleShow() {
    this.showPassword = !this.showPassword;
    if(this.showPassword){
      this.passwordToggleIcon = 'eye-off';
    }else{
      this.passwordToggleIcon = 'eye';
    }
  }

  toggleShowConfirm(){
    this.showPasswordConfirm = !this.showPasswordConfirm;
    if(this.showPasswordConfirm){
      this.passwordToggleIconConfirm = 'eye-off';
    }else{
      this.passwordToggleIconConfirm = 'eye';
    }
  }

  toggleShowNuevo(){
    this.showPasswordNuevo = !this.showPasswordNuevo;
    if(this.showPasswordNuevo){
      this.passwordToggleIconNuevo = 'eye-off';
    }else{
      this.passwordToggleIconNuevo = 'eye';
    }
  }
}
