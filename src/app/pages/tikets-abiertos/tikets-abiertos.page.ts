import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController, NavController } from '@ionic/angular';
import { FileOpener } from '@awesome-cordova-plugins/file-opener';
import { Filesystem, Directory } from '@capacitor/filesystem'

import { Ticket } from 'src/app/interfaces/interface';
import { LeerArchivoFromURLService } from 'src/app/services/leer-archivo-from-url.service';
import { StorageService } from 'src/app/services/storage.service';
import { TicketService } from 'src/app/services/ticket.service';
import { ModalInfoComponent } from 'src/app/components/modal-info/modal-info.component';
import { AlertPresentService } from 'src/app/services/alert-present.service';
import { ModalShowImageComponent } from 'src/app/components/modal-show-image/modal-show-image.component';

@Component({
  selector: 'app-tikets-abiertos',
  templateUrl: './tikets-abiertos.page.html',
  styleUrls: ['./tikets-abiertos.page.scss'],
})
export class TiketsAbiertosPage implements OnInit {

  tickets: Ticket[] = [];
  adjuntoNombre: string = '';
  constructor(private fileOpener: FileOpener,
    private navCtrl: NavController,
    private modalCtrl: ModalController,
    private storageService: StorageService,
    private loadingCtrl: LoadingController,
    private ticketsAbiertoSvr: TicketService,
    private leerArchivoFromUrlSvr: LeerArchivoFromURLService,
    private alerPresentSvr: AlertPresentService) { }

  async ngOnInit() {
    const { documento } = await this.storageService.getUsuario();
    this.tickets = (await this.ticketsAbiertoSvr.obtenerTicketsAbierto(documento)).tickets;
  }

  /**
   * navega a la pantalla responder ticket y guarda el ticket detalle
   */
  responder(indiceTicket: number, indiceDetalle: number) {
    this.guardarTicketDetalle(indiceTicket, indiceDetalle);
    this.navCtrl.navigateRoot('responder-ticket');
  }

  descargarArchivo(url: string, nameFile: string) {
    if (!nameFile) {
      this.alerPresentSvr.presentAlert('Ticket Abierto', '', 'Sin archivo adjunto para descargar', 'Aceptar');
      return;
    }
    nameFile = nameFile.substr(nameFile.lastIndexOf('/') + 1);
    this.showLoading('Espere. Descargando archivo...');
    this.leerArchivoFromUrlSvr.downloadFile(url, nameFile).then(async (response) => {
      if (response.path) {
        const read = await Filesystem.readFile({
          path: nameFile,
          directory: Directory.Documents
        });

        this.loadingCtrl.dismiss();//desactiva el loading
        const extensionArchivo = nameFile.substr(nameFile.lastIndexOf('.') + 1);
        if(extensionArchivo == 'pdf'){
          //`data:application/pdf,${read.data}`;
          this.alerPresentSvr.presentAlert('Descarga de archivo', 'Almacenamiento interno', `Archivo descargado en la ruta: ${response.path}`, 'Aceptar');
        }else{
          const image = `data:image/${extensionArchivo};base64,${read.data}`;
          this.mostrarArchivoDescargado(image, response.path);
        }
        
      } else if (response.blob) {
        const base64 = await this.leerArchivoFromUrlSvr.convertBlobToBase64(response.blob) as string;
        const saveFile = await Filesystem.writeFile({
          path: nameFile,
          data: base64,
          directory: Directory.Documents
        });
        this.loadingCtrl.dismiss();//desactiva el loading
        const path = saveFile.uri;
        this.fileOpener.open(path, response.blob.type).then((result) => {
          console.log('Archivo abierto: ', result);

        });
      }

    }).catch(error => {
      console.log(JSON.stringify(error));
      this.loadingCtrl.dismiss();//desactiva el loading
      this.presentarModal(error.name, JSON.stringify(error.message), false);
    });

  }

  cerrarTicket(indiceTicket: number, indiceDetalle: number) {
    this.guardarTicketDetalle(indiceTicket, indiceDetalle);
    this.navCtrl.navigateRoot('encuesta-ticket');
  }

  guardarTicketDetalle(indiceTicket: number, indiceDetalle: number) {
    const ticketSeleccionado = this.tickets[indiceTicket];
    const detalleTicketSeleccionado = ticketSeleccionado.detalle[indiceDetalle];
    this.storageService.guardarTicket(ticketSeleccionado);
    this.storageService.guardarDetalleTicket(detalleTicketSeleccionado);
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
  }

  async showLoading(mensaje: string) {
    const loading = await this.loadingCtrl.create({
      message: mensaje,
      //duration: 4000,
      spinner: 'bubbles',
      cssClass: 'custom-loading',
    });

    loading.present();
  }

  async mostrarArchivoDescargado(image:any, ruta:string){
    const modal = await this.modalCtrl.create({
      component: ModalShowImageComponent,
      componentProps:{
        image
      }
    });

    modal.present();
    const {role} = await modal.onDidDismiss();
    if(role == 'cerrar'){
      this.alerPresentSvr.presentAlert('Descarga de archivo', 'Almacenamiento interno', `Archivo descargado en la ruta: ${ruta}`, 'Aceptar');
    }
  }
}
