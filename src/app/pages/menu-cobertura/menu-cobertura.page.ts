import { Component } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';

import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { Device } from '@awesome-cordova-plugins/device/ngx';

import { CoberturaMedicaService } from 'src/app/services/cobertura-medica.service';
import { StorageService } from 'src/app/services/storage.service';
import { environment } from 'src/environments/environment';
import { ResponseValidaInscripcion } from 'src/app/interfaces/interface';

const urlDescargaDocumento = environment.urlDescargaDocumento;

@Component({
  selector: 'app-menu-cobertura',
  templateUrl: './menu-cobertura.page.html',
  styleUrls: ['./menu-cobertura.page.scss'],
})
export class MenuCoberturaPage {

  constructor(private navCtrl: NavController,
    private browser: InAppBrowser,
    private device: Device,
    private storageSvr: StorageService,
    private toastCtrl: ToastController,
    private coberturaMedicaService: CoberturaMedicaService) { }

  descargarDocumento() {
    const platform = this.device.platform;
    if (platform === 'ios' || platform === 'android') {
      this.browser.create(urlDescargaDocumento);
    } else {
      window.open(urlDescargaDocumento, '_blank');
    }
  }

  async irCoberturaMedica() {
    const { nroSocio } = await this.storageSvr.getUsuario();
    /* let { nroSolicitud,
       beneficio,
        codigoRetorno,
         descripcionRespuesta } = await this.coberturaMedicaService.validaInsrcipcion(nroSocio); */
    let validaInscripcion:ResponseValidaInscripcion = await this.coberturaMedicaService.validaInsrcipcion(nroSocio);
    await this.storageSvr.guardarValidaInscripcion(validaInscripcion);
    await this.storageSvr.guardarNroSolicitud(validaInscripcion.nroSolicitud);
    console.log(validaInscripcion);
    
    if (validaInscripcion.codigoRetorno == 0) {
      
      this.navCtrl.navigateRoot(`inicio/validar-beneficio/${validaInscripcion.beneficio}`);

    }

    if (validaInscripcion.codigoRetorno == 99) {
      this.presentToast('bottom', validaInscripcion.descripcionRespuesta);

    }

    if(validaInscripcion.codigoRetorno == 98){
      this.presentToast('bottom', validaInscripcion.descripcionRespuesta);

    }
    if(validaInscripcion.codigoRetorno == 97){
      this.navCtrl.navigateRoot(`/inicio/cotizar-plan`);
    }
    if(validaInscripcion.codigoRetorno == 96){
      this.navCtrl.navigateRoot(`adjuntar-documento/${validaInscripcion.codigoRetorno}`);
    }

    if(validaInscripcion.codigoRetorno == 95){
      this.presentToast('bottom', validaInscripcion.descripcionRespuesta);
    }

    if (validaInscripcion.codigoRetorno == 94) {
      this.navCtrl.navigateRoot(`inscripcion-medica-rechazo/${validaInscripcion.descripcionRespuesta}/${validaInscripcion.codigoRetorno}`);
    }
  }

  async agregarBeneficiarioAdherente(){
    const {nroSocio} = await this.storageSvr.getUsuario();
    
    let {codigoRetorno, Nomserv, codigo, Popcion, idplan, codsegmento, beneficio, nroSolicitud, descripcionRespuesta} = await this.coberturaMedicaService.getSolicitudBeneficiarioAdherente(nroSocio);
    const beneficiario = {
      Nomserv,
      codigo,
      Popcion,
      idplan,
      codsegmento,
      beneficio,
      descripcionRespuesta
    }
    await this.storageSvr.guardarDatosDeBeneficiarioAdherente(beneficiario);
    await this.storageSvr.guardarNroSolicitud(nroSolicitud);
    //codigoRetorno = 0;
    if(codigoRetorno == 0){
      this.navCtrl.navigateRoot(`cotizar-adherente/${codigoRetorno}`);
    }
    if(codigoRetorno == 99){
      this.presentToast('bottom', descripcionRespuesta);
    }

    if(codigoRetorno == 96){
      this.navCtrl.navigateRoot(`adjuntar-documento/${codigoRetorno}`);
    }
    if(codigoRetorno == 95){
      this.presentToast('bottom', descripcionRespuesta);
    }
    if(codigoRetorno == 94){
      this.navCtrl.navigateRoot(`inscripcion-medica-rechazo/${descripcionRespuesta}/${codigoRetorno}`);
    }
  }

  async irOpcionBajas(){

    const {nroSocio} = await this.storageSvr.getUsuario();
    let {codigo, codigoRetorno, Nomserv, nroSolicitud, descripcionRespuesta, Popcion, idplan, beneficio, codsegmento} = await this.coberturaMedicaService.validarBaja(nroSocio);
    let validacionBaja = {
      codigo,
      codigoRetorno,
      Nomserv,
      nroSolicitud,
      descripcionRespuesta,
      Popcion,
      idplan,
      beneficio,
      codsegmento
    };

    //guarda los datos de la validacion de baja en el local storage
    //para usar posterior en la pantall de baja parcial
    await this.storageSvr.guardarValidacionBaja(validacionBaja);
    
    if(codigoRetorno == 0){
      this.navCtrl.navigateRoot('opcion-bajas');
    }
    if(codigoRetorno == 99){
      this.presentToast('bottom', descripcionRespuesta);
    }
    if(codigoRetorno == 96){
      this.navCtrl.navigateRoot('opcion-baja-parcial');
    }
    if(codigoRetorno == 95){
      this.presentToast('bottom', descripcionRespuesta);
    }
    if(codigoRetorno == 94){
      this.presentToast('bottom', descripcionRespuesta);
    }
    if(codigoRetorno == 93){
      this.presentToast('bottom', descripcionRespuesta);
    }
    if(codigoRetorno == 92){
      this.presentToast('bottom', descripcionRespuesta);
    }
    if(codigoRetorno == 91){
      this.presentToast('bottom', descripcionRespuesta);
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
