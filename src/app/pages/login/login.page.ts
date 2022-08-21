import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Device } from '@awesome-cordova-plugins/device/ngx';
import { MenuController, NavController } from '@ionic/angular';
import CryptoJS from 'crypto-js';

import { UsuarioRequest } from 'src/app/interfaces/interface';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

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
  constructor(private loginSvr: AuthService,
              private menuCtrl:MenuController,
              private navCtrl:NavController,
              private device: Device) { }

  ngOnInit() {
    this.menuCtrl.enable(false);
  }

  /**
   * se encarga de llamar al servicio para dar ingreso al usuario
   * @param fLogin valores del formulario
   * @returns 
   */
  async login(fLogin:NgForm) {

    if(fLogin.invalid){
      return;
    }

    /**
     * crea un nuevo usuario en una constante para evitar modificaciones
     * en el template detalles visuales para el usuario
     */
    const nuevoUsuario:UsuarioRequest ={
      documento:this.usuario.documento,
      clave: CryptoJS.SHA256(fLogin.value.clave).toString(CryptoJS.enc.Hex),
      device: {
        os: this.device.platform,
        version: this.device.version,
        model: this.device.model,
        ip: ""
      }
    }
    
    
    const {usuario} = await this.loginSvr.login(nuevoUsuario);
    console.log(usuario);
    
    if(usuario.valido){
      this.navCtrl.navigateRoot('inicio');
    }else{
      console.log(usuario.mensaje);
      
    }
  }

}
