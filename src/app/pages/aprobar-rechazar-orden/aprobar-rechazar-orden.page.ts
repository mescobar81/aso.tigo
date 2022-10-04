import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalInfoComponent } from 'src/app/components/modal-info/modal-info.component';
import { ModalRechazoSolicitudComponent } from 'src/app/components/modal-rechazo-solicitud/modal-rechazo-solicitud.component';
import { Solicitud } from 'src/app/interfaces/interface';
import { SolicitudOrdenService } from 'src/app/services/solicitud-orden.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-aprobar-rechazar-orden',
  templateUrl: './aprobar-rechazar-orden.page.html',
  styleUrls: ['./aprobar-rechazar-orden.page.scss'],
})
export class AprobarRechazarOrdenPage implements OnInit {

  solicitudes: Solicitud[] = [];
  constructor(private solicitudSrv: SolicitudOrdenService,
    private storaSrv: StorageService,
    private modalCtrl: ModalController) { }

  ngOnInit() {
    this.init();
  }


  /**
   * envia la solicitu al servidor
   * @param motivoRechazo breve descripcion del porque fue rechazado
   * @param tipoSolicitud aprobado/rechazado
   * @param nro valor numerico del registro
   */
  async enviarSolicitudAprobadoRechazado(motivoRechazo: string, tipoSolicitud: string, nro: number) {

    const usuario = await this.storaSrv.getUsuario();//obtiene el usuario del localstrorage

    let solicitud = {};
    if (tipoSolicitud === 'R') {
      solicitud = {
        nroSocio: usuario.nroSocio,
        nroRegistro: nro,
        solicitudRespuesta: tipoSolicitud,
        motivoRechazo: motivoRechazo,
        rol: usuario.rol.roles[0]
      }
    } else {
      solicitud = {
        nroSocio: usuario.nroSocio,
        nroRegistro: nro,
        solicitudRespuesta: tipoSolicitud,
        motivoRechazo: motivoRechazo,
        rol: usuario.rol.roles[0]
      }
    }

    console.log(solicitud);

    try {
      const { mensaje, status } = await this.solicitudSrv.enviarSolicitudAprobadoRechazado(solicitud);

      if (status === 'success') {
        this.mostrarMensajeAprobadoRechazado('Solicitud de órden pendiente', mensaje, true);
      } else {
        this.mostrarMensajeAprobadoRechazado('Solicitud de órden pendiente', mensaje, false);
      }
    } catch (err) {
      this.mostrarMensajeAprobadoRechazado('Error Servidor', err, false);
    }
  }

  async openModal(nro: number) {
    const modal = await this.modalCtrl.create({
      component: ModalRechazoSolicitudComponent
    })

    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      this.enviarSolicitudAprobadoRechazado(data, 'R', nro);//envia para rechazo
    }
  }

  async mostrarMensajeAprobadoRechazado(title: string, descripcion: string, isCss: boolean) {
    const modal = await this.modalCtrl.create({
      component: ModalInfoComponent,
      componentProps: {
        descripcion,
        title,
        isCss
      }
    });

    modal.present();

    const { role } = await modal.onWillDismiss();
    if (role === 'confirm') {
      this.init();//inicializa los valores en los campos
    }
  }

  async init() {
    const usuario = await this.storaSrv.getUsuario();
    this.solicitudes = (await this.solicitudSrv.listarOrdenesPendientesByRol(usuario.rol.roles[0])).solicitudes;
  }
}
