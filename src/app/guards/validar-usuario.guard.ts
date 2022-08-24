import { Injectable } from '@angular/core';
import { CanActivate, CanLoad} from '@angular/router';
import { NavController } from '@ionic/angular';

import { AuthService } from '../services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class ValidarUsuarioGuard implements CanLoad {

  constructor(private authSvr:AuthService,
              private navCtrl:NavController){}

  canLoad(): Promise<boolean> | boolean {
     this.authSvr.validarUsuario().then(valid =>{
      if(!valid) {
        this.navCtrl.navigateRoot('login');
      }
    });
    return true;
  }
}
