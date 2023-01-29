import { Component, OnInit } from '@angular/core';
import { Device } from '@awesome-cordova-plugins/device/ngx';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { NavController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage.service';
import { environment } from 'src/environments/environment';

const urlDescargaDocumento = environment.urlDescargaDocumento;
@Component({
  selector: 'app-opcion-bajas',
  templateUrl: './opcion-bajas.page.html',
  styleUrls: ['./opcion-bajas.page.scss'],
})
export class OpcionBajasPage implements OnInit {

  constructor(
    private device: Device,
    private browser: InAppBrowser,
    private navCtrl: NavController) { }

  async ngOnInit() {
  }

  descargarSolicitud(){
    const platform = this.device.platform;
    if (platform === 'ios' || platform === 'android') {
      this.browser.create(urlDescargaDocumento);
    } else {
      window.open(urlDescargaDocumento, '_blank');
    }
    
  }

  irOpcionBajaParcial(){
    this.navCtrl.navigateRoot('opcion-baja-parcial');
  }

  
  async irOpcionBajaTotal(){

    this.navCtrl.navigateRoot('opcion-baja-total');
  }
}
