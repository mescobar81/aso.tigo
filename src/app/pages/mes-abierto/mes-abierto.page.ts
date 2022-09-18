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
  detalle:Detalle[] = [];
  constructor(private extractoMesSvr:ExtractoMesService) {
   }

  ngOnInit() {
    this.listarExtractoMes();
  }

  async listarExtractoMes(){
    await this.extractoMesSvr.getMesAbierto().then(resp =>{
      this.extratoMesAbierto = resp;
      this.detalle = resp?.detalle;
    });
    
  }
}
