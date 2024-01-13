import { Component, OnInit } from '@angular/core';

import { Detalle, ResponseMesAbierto } from 'src/app/interfaces/interface';
import { ExtractoMesService } from 'src/app/services/extracto-mes.service';

@Component({
  selector: 'app-mes-abierto',
  templateUrl: './mes-abierto.page.html',
  styleUrls: ['./mes-abierto.page.scss'],
})
export class MesAbiertoPage implements OnInit {

  extratoMesAbierto!:ResponseMesAbierto;
  totalDescuento:string = '';
  capitalAportado:string = '';
  detalle:Detalle[] = [];
  constructor(private extractoMesSvr:ExtractoMesService) {
   }

  ngOnInit() {
    this.listarExtractoMes();
  }

  async listarExtractoMes(){
    this.extratoMesAbierto = await this.extractoMesSvr.getMesAbierto();
    this.totalDescuento = this.extratoMesAbierto.cabecera?.totalDescuento.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
    this.capitalAportado = this.extratoMesAbierto.cabecera?.integrado.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
    this.extratoMesAbierto.detalle.forEach(e =>{
      this.detalle.push({
        cuota: e.cuota,
        monto: e.monto.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1."),
        saldo: e.saldo.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1."),
        comentario: e.comentario,
        nroDoc: e.nroDoc
      });
    });
  }

}
