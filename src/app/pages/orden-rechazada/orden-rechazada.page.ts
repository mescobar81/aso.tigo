import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';

import { SolicitudRechazada } from 'src/app/interfaces/interface';
import { SolicitudOrdenService } from 'src/app/services/solicitud-orden.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-orden-rechazada',
  templateUrl: './orden-rechazada.page.html',
  styleUrls: ['./orden-rechazada.page.scss'],
})
export class OrdenRechazadaPage implements OnInit {

  rechazadas:SolicitudRechazada[] = [];
  constructor(private solicitudOrdenSvr:SolicitudOrdenService,
              private loadingCtrl:LoadingController,
              private storageSvr:StorageService) { }

  async ngOnInit() {
    this.listarOrdenesRechazadas();
  }

  async marcarOrdenLeido(nroOrden:number){
    const usuario = await this.storageSvr.getUsuario();
    
    const valido = await this.solicitudOrdenSvr.marcarOrdenLeido(usuario.documento.toString(), nroOrden);

    if(!valido){
      console.log('ERROR: ', JSON.stringify('No es posible marcar como leído'));
      return;
    }
    this.listarOrdenesRechazadas();
  }

  async listarOrdenesRechazadas(){
       
    const usuario = await this.storageSvr.getUsuario();

    if(!usuario) {
      return;
    }
    this.showLoading('Aguarde. Cargando...');
    this.rechazadas = (await this.solicitudOrdenSvr.listarOrdenesRechazadas(usuario.nroSocio)).solicitudes;
    console.log(this.rechazadas);
    
    this.loadingCtrl.dismiss();
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
}
