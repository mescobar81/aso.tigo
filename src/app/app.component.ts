import { Component } from '@angular/core';


import { NotificacionService } from './services/notificacion.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private notificationSrv: NotificacionService) {}
}
