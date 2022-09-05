import { Injectable } from '@angular/core';
import { CanActivate, CanLoad} from '@angular/router';
import { NavController } from '@ionic/angular';


import { AuthService } from '../services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad, CanActivate {

  constructor(private authSvr:AuthService,
              private navCtrl:NavController){}
  canActivate(): boolean {
    this.authSvr.validarUsuario().then(valid =>{
     console.log('Valid canactivate: ' + valid);
      
      if(!valid) {
        this.navCtrl.navigateRoot('/login');
      }
    });
    return true;
  }

  canLoad(): boolean {
     this.authSvr.validarUsuario().then(valid =>{
      console.log('Valid canload: ' + valid);
      if(!valid) {
        this.navCtrl.navigateRoot('/login');
      }
    });
    return true;
  }
}
