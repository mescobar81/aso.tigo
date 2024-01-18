import { Component, OnInit } from '@angular/core';

import { Ciclo, DetalleBR, ResponseMovimientoBR } from 'src/app/interfaces/interface';
import { ExtractoMesService } from 'src/app/services/extracto-mes.service';
import { MovimientoBRService } from 'src/app/services/movimiento-br.service';
import { AlertController, LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-movimiento-br',
  templateUrl: './movimiento-br.page.html',
  styleUrls: ['./movimiento-br.page.scss'],
})
export class MovimientoBrPage implements OnInit {

  movimientoBR?: ResponseMovimientoBR;
  detalle: DetalleBR[] = [];
  ciclos: Ciclo[] = [];
  constructor(private loadingCtrl:LoadingController,
             private movimientoSvr: MovimientoBRService,
             private ciclosSvr: ExtractoMesService,
             private alertController:AlertController) { }

  async ngOnInit() {
    this.ciclosSvr.getCiclosCerrados().subscribe(resp => {
      this.ciclos = resp.ciclos;
    });
  }

  seleccionar(e: any) {
    this.movimientoBR = {};//limpiamos siempre para no mostrar el anterior registro
    this.detalle = [];//limpiamos siempre para no mostrar los anteriores registros
    const { mes, anho } = e.detail.value;
    this.showLoading('Aguarde. Cargando...');
    this.movimientoSvr.listarMovimientoBR(mes, anho).then(resp => {
      if (resp.detalle.length > 0) {
        this.movimientoBR = resp;
        this.detalle = resp.detalle;
      } else {
        this.presentAlert();
      }
      this.loadingCtrl.dismiss();
    });
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Atención',
      message: '¡Sin movimiento BR en el ciclo seleccionado!',
      buttons: ['Aceptar'],
    });

    await alert.present();
  }

  /**
   * mapea los meses en letras para mostrar en el select
   * ver: de la api viene en numero
   * @param mes 
   * @returns 
   */
  getMesEnLetras(mes: number): string {
    switch (mes) {
      case 1:
        return "Enero";
      case 2:
        return "Febrero";
      case 3:
        return "Marzo";
      case 4:
        return "Abril";
      case 5:
        return "Mayo";
      case 6:
        return "Junio";
      case 7:
        return "Julio";
      case 8:
        return "Agosto";
      case 9:
        return "Setiembre";
      case 10:
        return "Octubre";
      case 11:
        return "Noviembre";
      case 12:
        return "Diciembre";
      default: {
        console.log("Mes inválido");
        break;
      }
    }
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
