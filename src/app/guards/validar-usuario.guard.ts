import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, RouterStateSnapshot, UrlTree} from '@angular/router';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';

import { AuthService } from '../services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class ValidarUsuarioGuard implements CanLoad, CanActivate {

  constructor(private authSvr:AuthService,
              private navCtrl:NavController){}
  canActivate(): boolean | Promise<boolean> {
    this.authSvr.validarUsuario().then(valid =>{
      if(!valid) {
        this.navCtrl.navigateRoot('login');
      }
    });
    return true;
  }

  canLoad(): Promise<boolean> | boolean {
     this.authSvr.validarUsuario().then(valid =>{
      if(!valid) {
        this.navCtrl.navigateRoot('login');
      }
    });
    return true;
  }
}
