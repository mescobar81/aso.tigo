import { Component, OnInit } from '@angular/core';
import { ModalController, NavController, ToastController } from '@ionic/angular';

import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { Device } from '@awesome-cordova-plugins/device/ngx';

import { CoberturaMedicaService } from 'src/app/services/cobertura-medica.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-menu-cobertura',
  templateUrl: './menu-cobertura.page.html',
  styleUrls: ['./menu-cobertura.page.scss'],
})
export class MenuCoberturaPage implements OnInit {

  constructor(private navCtrl: NavController,
    private browser: InAppBrowser,
    private device: Device,
    private storageSvr: StorageService,
    private toastCtrl: ToastController,
    private coberturaMedicaService: CoberturaMedicaService) { }

  ngOnInit() {
  }

  descargarDocumento() {
    const platform = this.device.platform;
    if (platform === 'ios' || platform === 'android') {
      this.browser.create('https://www.web.asotigo.com.py/seguromedico');
    } else {
      window.open('https://www.web.asotigo.com.py/seguromedico', '_blank');
    }
  }

  async irCoberturaMedica() {
    const { nroSocio } = await this.storageSvr.getUsuario();
    let { nroSolicitud,
       beneficio,
        codigoRetorno,
         descripcionRespuesta } = await this.coberturaMedicaService.validaInsrcipcion(nroSocio);
         
    /* const descripcionRespuesta = 'Falta adjuntar solicitud de baja'; */
    await this.storageSvr.guardarNroSolicitud(nroSolicitud);
    if (codigoRetorno == 0) {
      
      this.navCtrl.navigateRoot(`inicio/validar-beneficio/${beneficio}`);

    }

    if (codigoRetorno == 99) {
      this.presentToast('bottom', descripcionRespuesta);

    }

    if(codigoRetorno == 98){
      this.presentToast('bottom', descripcionRespuesta);

    }
    if(codigoRetorno == 97){
      this.navCtrl.navigateRoot(`/inicio/cotizar-plan/${beneficio}/${codigoRetorno}`);
    }
    if(codigoRetorno == 96){
      this.navCtrl.navigateRoot(`adjuntar-documento/${codigoRetorno}`);
    }

    if(codigoRetorno == 95){
      this.presentToast('bottom', descripcionRespuesta);
    }

    if (codigoRetorno == 94) {
      this.navCtrl.navigateRoot(`inscripcion-medica-rechazo/${descripcionRespuesta}/${codigoRetorno}`);
    }
  }

  async agregarBeneficiarioAdherente(){
    const {nroSocio} = await this.storageSvr.getUsuario();
    
    let {codigoRetorno, Nomserv, codigo, Popcion, idplan, codsegmento, beneficio} = await this.coberturaMedicaService.getSolicitudBeneficiarioAdherente('114');
    const beneficiario = {
      Nomserv,
      codigo,
      Popcion,
      idplan,
      codsegmento,
      beneficio
    }
    await this.storageSvr.guardarDatosDeBeneficiarioAdherente(beneficiario);
    codigoRetorno = 0;

    if(codigoRetorno == 0){
      this.navCtrl.navigateRoot(`cotizar-adherente`);
    }

  }

  async presentToast(position: 'top' | 'middle' | 'bottom', mensaje: string) {
    const toast = await this.toastCtrl.create({
      message: mensaje,
      duration: 2200,
      position: position,
      icon: 'warning',
      cssClass: ['toast-menu-cobertura']
    });

    await toast.present();
  }

}
