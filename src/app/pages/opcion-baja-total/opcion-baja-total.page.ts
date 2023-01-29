import { Component, OnInit } from '@angular/core';
import { File } from '@awesome-cordova-plugins/file/ngx';
import { ModalController, NavController, ToastController } from '@ionic/angular';
import { ModalInfoComponent } from 'src/app/components/modal-info/modal-info.component';
import { CoberturaMedicaService } from 'src/app/services/cobertura-medica.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-opcion-baja-total',
  templateUrl: './opcion-baja-total.page.html',
  styleUrls: ['./opcion-baja-total.page.scss'],
})
export class OpcionBajaTotalPage {

  file: File;
  adjuntos: any[] = [];
  adjuntados: string[] = [];
  constructor(private storageSvr: StorageService,
    private modalCtrl: ModalController,
    private toastCtrl: ToastController,
    private navCtrl: NavController,
    private coberturaMedicaSvr: CoberturaMedicaService) { }


  seleccionarArchivo(event: any) {

    this.file = event.target.files[0];

    this.adjuntados.push(event.target.files[0].name);//para mostrar los nombres de archivo al usuario

    this.adjuntos.push({
      blob: this.file,
      name: event.target.files[0].name
    });//para el envio de archivos blob al servicio
  }

  eliminarAdjunto(indice: number) {
    this.adjuntos.splice(indice, 1);
  }

  async enviarSolicitud() {
    if(this.adjuntos.length === 0){
      this.presentToast('bottom', 'Agregue al menos una solicitud de baja');
      return;
    }

    const { nombre, nroSocio } = await this.storageSvr.getUsuario();
    const { nroSolicitud } = await this.storageSvr.getValidacionBaja();

    let formData = new FormData();
    formData.append('file', this.adjuntos[0].blob, this.adjuntos[0].name);
    formData.append('nroSolicitud', nroSolicitud);
    formData.append('nroSocio', nroSocio);
    formData.append('nombre', nombre);

    const { status, mensaje } = await this.coberturaMedicaSvr.enviarSolicitudBajaTotal(formData);
    if (status === 'success') {
      this.presentarModal('Solicitud Baja', mensaje, true);
    } else {
      this.presentarModal('Solicitud Baja', mensaje, false);
    }
  }

  async presentarModal(title: string, descripcion: string, isCss: boolean) {
    const modal = await this.modalCtrl.create({
      component: ModalInfoComponent,
      componentProps: {
        descripcion,
        title,
        isCss
      }
    });

    await modal.present();
    const {role} = await modal.onWillDismiss();
    if(role === 'confirm'){
      this.navCtrl.navigateRoot('inicio/menu-cobertura');
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
