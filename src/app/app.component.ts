import { Component, OnInit } from '@angular/core';
import { SplashScreen } from '@capacitor/splash-screen'
import { NotificacionService } from './services/notificacion.service';
import { Device } from '@awesome-cordova-plugins/device/ngx';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{
  constructor(private device:Device,
              private navCtrl: NavController,
    private notificationSrv: NotificacionService) {
  }
  ngOnInit(): void {
    SplashScreen.hide();
    if(this.device.platform === 'ios') {
      this.navCtrl.navigateRoot('login');
    }else{
      this.navCtrl.navigateRoot('bienvenido');
    }
  }
}
