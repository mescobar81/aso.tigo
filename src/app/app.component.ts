import { Component, OnInit } from '@angular/core';
import { SplashScreen } from '@capacitor/splash-screen'
import { NotificacionService } from './services/notificacion.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{
  constructor(private notificationSrv: NotificacionService) {
  }
  async ngOnInit() {
    await SplashScreen.hide();
    
    /* if(this.device.platform.toLowerCase() === 'android') {
      console.log('Android');
      
      setTimeout(() => {
        this.navCtrl.navigateRoot('bienvenido');
      }, 1600);
      this.navCtrl.navigateRoot('login');
    } */
   /*  if(this.device.platform === 'ios') {
      this.navCtrl.navigateRoot('login');
    }else{
      this.navCtrl.navigateRoot('bienvenido');
    } */
  }
}
