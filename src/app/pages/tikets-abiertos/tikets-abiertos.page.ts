import { Component, OnInit, Renderer2 } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { FileOpener } from '@awesome-cordova-plugins/file-opener';
import { Filesystem, Directory } from '@capacitor/filesystem'

import { Ticket } from 'src/app/interfaces/interface';
import { LeerArchivoFromURLService } from 'src/app/services/leer-archivo-from-url.service';
import { StorageService } from 'src/app/services/storage.service';
import { TicketService } from 'src/app/services/ticket.service';
import { ModalInfoComponent } from 'src/app/components/modal-info/modal-info.component';

@Component({
  selector: 'app-tikets-abiertos',
  templateUrl: './tikets-abiertos.page.html',
  styleUrls: ['./tikets-abiertos.page.scss'],
})
export class TiketsAbiertosPage implements OnInit {

  tickets: Ticket[] = [];
  adjuntoNombre: string = '';
  constructor(private render: Renderer2,
    private fileOpener: FileOpener,
    private navCtrl: NavController,
    private modalCtrl: ModalController,
    private storageService: StorageService,
    private ticketsAbiertoSvr: TicketService,
    private leerArchivoFromUrlSvr: LeerArchivoFromURLService) { }

  async ngOnInit() {
    const { documento } = await this.storageService.getUsuario();
    this.tickets = (await this.ticketsAbiertoSvr.obtenerTicketsAbierto(documento)).tickets;
    console.log(this.tickets);

  }

  responder(indiceTicket: number, indiceDetalle: number) {
    this.guardarTicketDetalle(indiceTicket, indiceDetalle);
    this.navCtrl.navigateRoot('responder-ticket');
  }

  async descargarArchivo(url: string, nameFile: string) {

    try {
      const blob = await this.leerArchivoFromUrlSvr.getBlobFromUrl(url);
      console.log(blob);
      const base64 = await this.leerArchivoFromUrlSvr.convertBlobToBase64(blob) as string;
      console.log(base64);
      const saveFile = await Filesystem.writeFile({
        path: nameFile.substr(nameFile.lastIndexOf('/') + 1),
        data: base64,
        directory: Directory.Documents
      });
      const path = saveFile.uri;
      this.fileOpener.open(path, blob.type).then((result) => {
        console.log('Archivo abierto');

      });
    } catch (error) {
      console.log(JSON.stringify(error));
      this.presentarModal(error.name, JSON.stringify(error.message), false);
    }

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
}
