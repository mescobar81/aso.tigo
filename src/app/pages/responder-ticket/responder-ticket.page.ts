import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { ModalInfoComponent } from 'src/app/components/modal-info/modal-info.component';
import { StorageService } from 'src/app/services/storage.service';
import { TicketService } from 'src/app/services/ticket.service';

@Component({
  selector: 'app-responder-ticket',
  templateUrl: './responder-ticket.page.html',
  styleUrls: ['./responder-ticket.page.scss'],
})
export class ResponderTicketPage implements OnInit {

  nombreArchivoAdjunto: string = '';
  file: File;
  ticket = {
    nroTicket: '',
    asunto: '',
    detalle: {
      fecha: '',
      comentario: '',
      usuarioResponde: ''
    }
  }
  nuevoTicket = {
    documento: '',
    nroreg: '',
    nroticket: '',
    rol: '',
    codUsuario: '',
    comentario: ''
  };
  constructor(private storageService: StorageService,
    private ticketService: TicketService,
    private navCtrl: NavController,
    private modalCtrl: ModalController,
    private alertController: AlertController
  ) { }

  async ngOnInit() {
    const { nroticket, asunto } = (await this.storageService.getTicket()).cabecera;
    const { fecha, usuario_responde, nroreg, comentario } = await this.storageService.getDetalleTicket();

    this.ticket.nroTicket = nroticket;
    this.ticket.asunto = asunto;
    this.ticket.detalle.fecha = fecha;
    this.ticket.detalle.comentario = comentario;
    this.ticket.detalle.usuarioResponde = usuario_responde;
    this.nuevoTicket.nroreg = nroreg;
    this.nuevoTicket.nroticket = nroticket;
  }

  async responderTicket(fTicket: NgForm) {

    const { rol, nroSocio, documento } = await this.storageService.getUsuario();
    this.nuevoTicket.documento = documento.toString();
    this.nuevoTicket.rol = rol.roles[0];
    this.nuevoTicket.codUsuario = nroSocio;
    this.nuevoTicket.comentario = fTicket.value.comentario;

    const formData = new FormData();
    if (!this.file) {
      formData.append('documento', this.nuevoTicket.documento);
      formData.append('nroticket', this.nuevoTicket.nroticket);
      formData.append('nroreg', this.nuevoTicket.nroreg);
      formData.append('rol', this.nuevoTicket.rol)
      formData.append('codUsuario', this.nuevoTicket.codUsuario);
      formData.append('comentario', this.nuevoTicket.comentario);
    } else {
      formData.append('documento', this.nuevoTicket.documento);
      formData.append('nroticket', this.nuevoTicket.nroticket);
      formData.append('nroreg', this.nuevoTicket.nroreg);
      formData.append('rol', this.nuevoTicket.rol)
      formData.append('codUsuario', this.nuevoTicket.codUsuario);
      formData.append('comentario', this.nuevoTicket.comentario);
      formData.append('file', this.file, this.file.name);
    }

    try {
      const { mensaje, status } = await this.ticketService.responderTicket(formData);
      if (status === 'success') {
        this.presentarModal('Ticket leído exitosamente', mensaje, true);
        return;
      }
      this.presentarModal('Ticket leído con error', mensaje, false);
    } catch (error) {
      console.log(JSON.stringify(error));
      this.presentarModal(error.name, JSON.stringify(error.message), false);
    }

  }

  seleccionarArchivo(e: any) {
    this.file = e.target.files[0];
    this.nombreArchivoAdjunto = this.file.name;
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Alerta',
      subHeader: '¡Archivos adjuntos!',
      message: 'Favor. Adjuntar archivo',
      buttons: ['Aceptar'],
    });

    await alert.present();
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
    const { role } = await modal.onWillDismiss();
    if (role === 'confirm') {
      this.navCtrl.navigateRoot('/inicio/tikets-abiertos');
    }
  }
}
