import { Injectable } from '@angular/core';
import { CanActivate, CanLoad} from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from '../services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class ValidarUsuarioGuard implements CanActivate, CanLoad {

  constructor(private authSvr:AuthService){}

  canActivate(): Promise<boolean> {
    return this.authSvr.validarUsuario();
  }
  canLoad(): Promise<boolean>  {
    return this.authSvr.validarUsuario();
  }
}
