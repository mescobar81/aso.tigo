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
  ngOnInit(): void {
    setTimeout(() =>{
      SplashScreen.hide();
    }, 1000)
  }
}
