import { Component, OnInit } from '@angular/core';

import { SolicitudPendiente } from 'src/app/interfaces/interface';
import { SolicitudOrdenService } from 'src/app/services/solicitud-orden.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-ordenes-pendientes',
  templateUrl: './ordenes-pendientes.page.html',
  styleUrls: ['./ordenes-pendientes.page.scss'],
})
export class OrdenesPendientesPage implements OnInit {

  pendientes:SolicitudPendiente[] = [];
  constructor(private solicitudOrden:SolicitudOrdenService,
              private storageSvr:StorageService) { }

  async ngOnInit() {
    const usuario = await this.storageSvr.getUsuario();
    if(!usuario) {
      return;
    }
    this.pendientes = (await this.solicitudOrden.listarOrdenesPendientes(usuario.nroSocio)).solicitudes;
  }

}
