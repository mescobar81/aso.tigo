import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Device } from '@awesome-cordova-plugins/device/ngx';
import { MenuController, NavController } from '@ionic/angular';
import * as CryptoJS from 'crypto-js';

import { UsuarioRequest } from 'src/app/interfaces/interface';
import { AlertPresentService } from 'src/app/services/alert-present.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  usuario: UsuarioRequest = {
    documento:"",
    clave:"",
    device: {
      os: '',
      version: '',
      model: '',
      ip: ''
    }
  };
  constructor(private authSvr: AuthService,
              private menuCtrl:MenuController,
              private navCtrl:NavController,
              //private device: Device,
              private alertSvr:AlertPresentService) { }

  /**
   * se encarga de llamar al servicio para dar ingreso al usuario
   * @param fLogin valores del formulario
   * @returns 
   */
  async login(fLogin:NgForm) {

    if(!fLogin.valid){
      return;
    }

    /**
     * crea un nuevo usuario en una constante para evitar modificaciones
     * en el template detalles visuales para el usuario
     */
    const nuevoUsuario:UsuarioRequest ={
      documento:this.usuario.documento,
      clave: CryptoJS.SHA256(this.usuario.clave).toString(CryptoJS.enc.Hex),
      device: {
        os: '',//this.device.platform,
        version: '',//this.device.version,
        model: '',//this.device.model,
        ip: '',//this.device.uuid
      }
    }

    console.log(JSON.stringify(nuevoUsuario));
    

    await this.authSvr.login(nuevoUsuario).then(data =>{
    if(data.usuario.valido){
      console.log(data);
      this.navCtrl.navigateRoot('/inicio');
      this.menuCtrl.open('first');
    }else{
      this.alertSvr.presentAlert("Atención", "", data.usuario.mensaje, "Aceptar");
    }
    }).catch(err =>{console.log(JSON.stringify(err));
    });
  }

}
