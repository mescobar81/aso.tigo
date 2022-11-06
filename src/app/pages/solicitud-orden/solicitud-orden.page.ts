import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { SolicitudOrdenService } from 'src/app/services/solicitud-orden.service';
import { Comercio, FormasPago, SolicitudOrden, ResponseSolicitudOrden, OrdenSolicitada } from 'src/app/interfaces/interface';
import { StorageService } from 'src/app/services/storage.service';
import { ModalInfoComponent } from 'src/app/components/modal-info/modal-info.component';



@Component({
  selector: 'app-solicitud-orden',
  templateUrl: './solicitud-orden.page.html',
  styleUrls: ['./solicitud-orden.page.scss'],
})
export class SolicitudOrdenPage implements OnInit {

  onDebouncer:Subject<number> = new Subject();

  comercios: Comercio[] = [];
  formasPagos: FormasPago[] = [];
  cuotasMaximas: Number[] = [];
  region = {
    nombre: 'Asunción'
  }

  montoSolicitado:number = 0;
  nuevaOrden: OrdenSolicitada = {
    nroSocio: 0,
    codComercio: 0,
    montoSolicitado: 0,
    cantidadCuotas: 0,
    cuotaMes: 0,
    rol: '',
    formaPago: 0
  }

  solicitudOrden: SolicitudOrden = {
    usuario: null,
    comercio: null,
    montoSolicitado: 0,
    cantidadCuotas: 0,
    cuotaMes: 0,
    rol: null,
    formaPago: null
  };
  constructor(private solicitudOrdenSvr: SolicitudOrdenService,
    private storageSvr: StorageService,
    private modalCtrl: ModalController) { }

  async ngOnInit() {
    this.init();
    this.onDebouncer
    .pipe(debounceTime(500))
    .subscribe(montoSolicitado =>{
      const cuotaMensual = montoSolicitado / this.solicitudOrden.cantidadCuotas;
      this.solicitudOrden.cuotaMes = parseInt(String(cuotaMensual));
    })
  }

  async init() {
    this.comercios = (await this.solicitudOrdenSvr.listarCasasComerciales(0)).comercios;
    this.formasPagos = (await this.solicitudOrdenSvr.listarFormasDePagos()).FormasPago;
    this.nuevaOrden = {};
    this.solicitudOrden = {};
  }

  seleccionarComercio() {
    if (!this.solicitudOrden.comercio) {
      return;
    }
    this.nuevaOrden.codComercio = this.solicitudOrden.comercio.codigoComercio;
    this.cargarCuotasMaximas(this.solicitudOrden.comercio.cantMaxCuotas);
  }

  seleccionarFormaPago() {
    if (!this.solicitudOrden.formaPago) {
      return;
    }
    this.nuevaOrden.formaPago = this.solicitudOrden.formaPago.formaPagoId;
  }

  cargarCuotasMaximas(cuotaMaxima: number) {
    this.cuotasMaximas = [];
    for (let i = 1; i <= cuotaMaxima; i++) {
      this.cuotasMaximas.push(i);
    }
  }

  async enviarSolicitudOrden(fSolicitud: NgForm) {

    if (!fSolicitud.valid) {
      return;
    }

    /**
     * obtiene los datos del usuario
     */
    const usuario = await this.storageSvr.getUsuario();

    /**
     * establece los datos para la orden solicitada
     */
    this.nuevaOrden.nroSocio = parseInt(usuario.nroSocio);
    this.nuevaOrden.rol = usuario.rol.roles[0];
    this.nuevaOrden.montoSolicitado = this.solicitudOrden.montoSolicitado;
    this.nuevaOrden.cantidadCuotas = this.solicitudOrden.cantidadCuotas;
    this.nuevaOrden.cuotaMes = this.solicitudOrden.cuotaMes;

    const response: ResponseSolicitudOrden = await this.solicitudOrdenSvr.enviarSolicitudOrden(this.nuevaOrden);

    if (response.codigoRespuesta == '00') {

      this.presentarModal('', response.descripcionRespuesta, true);

    } else if (response.codigoRespuesta == '99') {

      this.presentarModal('Solicitud Órden', response.descripcionRespuesta, false);
    } else {
      this.presentarModal('Información', response.mensaje, false);
    }
  }

  calcularCuotaMensual(event:any) {
    const montoSolicitado = event.target.value;
    if (!montoSolicitado) {
      return;
    }
    this.onDebouncer.next(montoSolicitado);
    /* setTimeout(() => {
      const cuotaMensual = this.solicitudOrden.montoSolicitado / this.solicitudOrden.cantidadCuotas;
      this.solicitudOrden.cuotaMes = parseInt(String(cuotaMensual));
    }, 500) */
  }

  /**
   * vuelve a calcular la cuota mensual si cambia el valor de la cuota en el combo
   * @returns 
   */
  recalcularCuotaMensual(){
    if(!this.solicitudOrden.montoSolicitado){
      return;
    }
    this.onDebouncer.next(this.solicitudOrden.montoSolicitado);
  }


  async presentarModal(title: string, descripcion: string, isCss: boolean) {
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
}
