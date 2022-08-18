import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Device } from '@awesome-cordova-plugins/device/ngx';
import { NavController } from '@ionic/angular';
import CryptoJS from 'crypto-js';
import { UsuarioRequest } from 'src/app/interfaces/interface';

import { LoginService } from 'src/app/services/login.service';

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
  constructor(private loginSvr: LoginService,
              private navCtrl:NavController,
              private device: Device) { }

  ngOnInit() {
  }

  async login(fLogin:NgForm) {

    if(fLogin.invalid){
      return;
    }
    console.log(fLogin.value);
    
    this.usuario.documento = fLogin.value.documento;
    this.usuario.clave =  CryptoJS.SHA256(fLogin.value.clave).toString(CryptoJS.enc.Hex);
    
    console.log(this.usuario);
    
    const {usuario} = await this.loginSvr.login(this.usuario);

    if(usuario.valido){
      this.navCtrl.navigateRoot('inicio');
    }else{
      console.log(usuario.mensaje);
      
    }
  }

}
