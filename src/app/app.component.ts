import { Component, OnInit } from '@angular/core';
import { SplashScreen } from '@capacitor/splash-screen'
import { NotificacionService } from './services/notificacion.service';
import { UpdateStoreAppService } from './services/update-store-app.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{
  constructor(private updateStoreAppServ:UpdateStoreAppService,
    private notificationSrv: NotificacionService) {
  }
  async ngOnInit() {
    await SplashScreen.hide();
    
    this.updateStoreAppServ.getAppVersionStore('');

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
