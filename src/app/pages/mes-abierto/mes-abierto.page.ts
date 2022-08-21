import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResponseMesAbierto } from 'src/app/interfaces/interface';
import { ExtractoMesService } from 'src/app/services/extracto-mes.service';

@Component({
  selector: 'app-mes-abierto',
  templateUrl: './mes-abierto.page.html',
  styleUrls: ['./mes-abierto.page.scss'],
})
export class MesAbiertoPage implements OnInit {


  extractoMes!:ResponseMesAbierto;
  constructor(private extractoMesSvr:ExtractoMesService,
              private activatedRoute: ActivatedRoute) {
   }

  ngOnInit() {
    this.listarExtractoMes();
  }

  async listarExtractoMes(){
    const paramNroSocio = this.activatedRoute.snapshot.paramMap.get('nroSocio');
    this.extractoMes = await this.extractoMesSvr.getMesAbierto(parseInt(paramNroSocio));
  }
}
