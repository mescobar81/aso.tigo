import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';

import { Detalle, ResponseMesAbierto } from 'src/app/interfaces/interface';
import { ExtractoMesService } from 'src/app/services/extracto-mes.service';

@Component({
  selector: 'app-mes-abierto',
  templateUrl: './mes-abierto.page.html',
  styleUrls: ['./mes-abierto.page.scss'],
})
export class MesAbiertoPage implements OnInit {

  extratoMesAbierto!:ResponseMesAbierto;
  detalle:Detalle[] = [];
  constructor(private loadingCtrl:LoadingController,
    private extractoMesSvr:ExtractoMesService) {
   }

  ngOnInit() {
    this.listarExtractoMes();
  }

  async listarExtractoMes(){
    this.showLoading('Aguarde. Cargando...');
    this.extratoMesAbierto = await this.extractoMesSvr.getMesAbierto();
    this.detalle = this.extratoMesAbierto.detalle;
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
