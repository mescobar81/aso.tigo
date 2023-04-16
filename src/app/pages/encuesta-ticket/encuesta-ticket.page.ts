import { Component, OnInit } from '@angular/core';
import { Calificacion } from 'src/app/interfaces/interface';
import { TicketService } from 'src/app/services/ticket.service';
import { StorageService } from 'src/app/services/storage.service';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { ModalInfoComponent } from 'src/app/components/modal-info/modal-info.component';

@Component({
  selector: 'app-encuesta-ticket',
  templateUrl: './encuesta-ticket.page.html',
  styleUrls: ['./encuesta-ticket.page.scss'],
})
export class EncuestaTicketPage implements OnInit {

  calificaciones: Calificacion[] = [];
  calificacion: Calificacion = {
    id: 0,
    descripcion: ''
  };
  ticket = {
    nroreg: '',
    nroticket: '',
    encuesta:0,
    codUsuario: ''
  }
  constructor(private alertController: AlertController,
    private modalCtrl: ModalController,
    private navCtrl: NavController,
    private ticketService: TicketService,
    private storageService: StorageService) { }

  async ngOnInit() {
    this.calificaciones = (await this.ticketService.obtenerCalificacionTicket()).calificaciones;
    const { nroSocio } = await this.storageService.getUsuario();
    const { nroticket } = (await this.storageService.getTicket()).cabecera;
    const { nroreg } = await this.storageService.getDetalleTicket();
    this.ticket.nroticket = nroticket;
    this.ticket.nroreg = nroreg;
    this.ticket.codUsuario = nroSocio;
  }

  seleccionarCalificacion(e: any) {
    this.ticket.encuesta = e.detail.value.id;
  }

  async cerrarTicket() {
    if (this.ticket.encuesta <= 0) {
      this.presentAlert();
      return;
    }
    
    try {
      const { mensaje, status } = await this.ticketService.cerrarTicket(this.ticket);

      if (status === 'success') {
        this.presentarModal('Cerrar Ticket', mensaje, true);
      }else {
        this.presentarModal('Cerrar Ticket', mensaje, false);
      }
    } catch (error) {
      console.log(JSON.stringify(error));
      this.presentarModal(error.name, JSON.stringify(error.message), false);
    }

  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Alerta',
      subHeader: '¡Cerrar Ticket!',
      message: 'Favor. Seleccione calificación',
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
