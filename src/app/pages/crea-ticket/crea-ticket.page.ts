import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TiposSolicitud } from 'src/app/interfaces/interface';
import { CreaTicketService } from 'src/app/services/crea-ticket.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-crea-ticket',
  templateUrl: './crea-ticket.page.html',
  styleUrls: ['./crea-ticket.page.scss'],
})
export class CreaTicketPage implements OnInit {

  tiposSolicitud:TiposSolicitud[] = [];

  nuevaSolicitud = {
    file:'',
    documento:0,
    tipoSolicitud:0,
    asunto:'',
    rol:'',
    codUsuario:'',
    comentario:''
  };
  constructor(private creaTicketSrv:CreaTicketService,
             private storageSrv:StorageService ) { }

  ngOnInit() {
    this.init();
  }

  async enviarSolicitud(fSolicitud:NgForm){
    const usuario = await this.storageSrv.getUsuario();
    if(!usuario){
      return;
    }
    this.nuevaSolicitud = {
      file:'',
      documento:usuario.documento,
      tipoSolicitud:fSolicitud.value.tiposSolicitud,
      asunto:fSolicitud.value.asunto,
      rol:usuario.rol.roles[0],
      codUsuario:usuario.nroSocio,
      comentario:fSolicitud.value.comentario
    }

    console.log(this.nuevaSolicitud);
    
  }

  seleccionarTicket(){
    
  }

  async init(){
    this.tiposSolicitud = (await this.creaTicketSrv.listarTipoSolicitud()).tiposSolicitud;
  }

}
