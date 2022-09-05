import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertController } from '@ionic/angular';

import { SolicitudOrdenService } from 'src/app/services/solicitud-orden.service';
import { Comercio, FormasPago, SolicitudOrden, ResponseSolicitudOrden, OrdenSolicitada } from 'src/app/interfaces/interface';
import { StorageService } from 'src/app/services/storage.service';


@Component({
  selector: 'app-solicitud-orden',
  templateUrl: './solicitud-orden.page.html',
  styleUrls: ['./solicitud-orden.page.scss'],
})
export class SolicitudOrdenPage implements OnInit {


  comercios:Comercio[] = [];
  formasPagos:FormasPago[] = [];
  cuotasMaximas:Number[] = [];
  region = {
    nombre:'Asunción'
  }

  nuevaOrden:OrdenSolicitada = {
    nroSocio:0,
    codComercio:0,
    montoSolicitado:0,
    cantidadCuotas:0,
    cuotaMes:0,
    rol:'',
    formaPago:0
  }

  solicitudOrden:SolicitudOrden = {
    usuario:null,
    comercio:null,
    montoSolicitado:0,
    cantidadCuotas:0,
    cuotaMes:0,
    rol:null,
    formaPago:null
  };
  constructor(private solicitudOrdenSvr:SolicitudOrdenService,
              private storageSvr:StorageService,
              private alertController:AlertController) { }

  async ngOnInit() {
    this.init();
  }

  async init(){
    this.comercios = (await this.solicitudOrdenSvr.listarCasasComerciales(0)).comercios;
    this.formasPagos = (await this.solicitudOrdenSvr.listarFormasDePagos()).FormasPago;
    this.storageSvr.setUsuario();
  }

  seleccionarComercio(){
    if(!this.solicitudOrden.comercio){
      return;
    }
    this.nuevaOrden.codComercio = this.solicitudOrden.comercio.codigoComercio;
    this.cargarCuotasMaximas(this.solicitudOrden.comercio.cantMaxCuotas);
  }

  seleccionarFormaPago(){
    if(!this.solicitudOrden.formaPago){
      return;
    }
    this.nuevaOrden.formaPago = this.solicitudOrden.formaPago.formaPagoId;
  }

  cargarCuotasMaximas(cuotaMaxima:number){
    this.cuotasMaximas = [];
    for(let i = 1; i <= cuotaMaxima; i++){
      this.cuotasMaximas.push(i);
    }
  }

  async enviarSolicitudOrden(fSolicitud:NgForm){

    if(!fSolicitud.valid){
      return;
    }
    
    /**
     * obtiene los datos del local storage
     */
    const data =  this.storageSvr.getUsuario;

    /**
     * establece los datos para la orden solicitada
     */
    this.nuevaOrden.nroSocio = parseInt(data.usuario.nroSocio);
    this.nuevaOrden.rol = data.usuario.rol.roles[0];
    this.nuevaOrden.montoSolicitado = this.solicitudOrden.montoSolicitado;
    this.nuevaOrden.cantidadCuotas = this.solicitudOrden.cantidadCuotas;
    this.nuevaOrden.cuotaMes = this.solicitudOrden.cuotaMes;
    console.log(this.nuevaOrden);
    console.log(fSolicitud.invalid);
    
    const response:ResponseSolicitudOrden = await this.solicitudOrdenSvr.enviarSolicitudOrden(this.nuevaOrden);
    
    if(response.codigoRespuesta == '00'){
      this.presentAlert('', response.descripcionRespuesta);
    }else if(response.codigoRespuesta == '99'){
      this.presentAlert('', response.descripcionRespuesta);
    }
  }

  calcularCuotaMensual(){

    if(!this.solicitudOrden.montoSolicitado){
      return;
    }
    setTimeout(() =>{
      const cuotaMensual = this.solicitudOrden.montoSolicitado/this.solicitudOrden.cantidadCuotas;
      
      this.solicitudOrden.cuotaMes = parseInt(String(cuotaMensual));
      console.log('Cuota Mensual', this.solicitudOrden.cuotaMes);
      
    },2000)
  }

  async presentAlert(header:string, message:string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      cssClass:'alert-message',
      buttons: [{
        text:'Aceptar',
        cssClass:'alert-button',
        role: 'alert',
        handler:() =>{
          this.solicitudOrden = {};
          this.nuevaOrden = {};
          this.comercios = [];
          this.formasPagos = [];
          this.init();
        }
      }],
    });

    await alert.present();
  }
}
