import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonInput, ModalController } from '@ionic/angular';
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

  DECIMAL_SEPARATOR=".";
  GROUP_SEPARATOR=",";
  @ViewChild('importeMonto') importeMonto:IonInput;
  importeFormateado:string = '';
  importeCuota:number = 0;
  onDebouncer:Subject<number> = new Subject();
  onDebouncerSeparadorMiles:Subject<string> = new Subject();
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
    montoSolicitado: '',
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
    .subscribe((montoSolicitado:number) =>{
      const cuotaMensual = montoSolicitado / this.solicitudOrden.cantidadCuotas;
      this.solicitudOrden.cuotaMes = cuotaMensual;
      this.importeCuota = Math.round(cuotaMensual);//redondea el importe a entero
    });

    this.onDebouncerSeparadorMiles
    .pipe(debounceTime(100))
    .subscribe((importe:string) =>{
      //separa el importe usando el punto y vuelve a unir
      //ver: para poder ver en el campo importe el separador de miles
      let importeSinSeparador = importe; //importe.split(',').join("");
      this.importeFormateado = importeSinSeparador.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
      
    });

  }

  async init() {
    this.comercios = (await this.solicitudOrdenSvr.listarCasasComerciales(0)).comercios;
    this.formasPagos = (await this.solicitudOrdenSvr.listarFormasDePagos()).FormasPago;
    this.nuevaOrden = {};
    this.solicitudOrden = {};
    this.importeFormateado = '';
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
    this.nuevaOrden.montoSolicitado = parseInt(this.solicitudOrden.montoSolicitado);
    this.nuevaOrden.cantidadCuotas = this.solicitudOrden.cantidadCuotas;
    this.nuevaOrden.cuotaMes = this.importeCuota;
    console.log(this.nuevaOrden);
    
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
    const montoSolicitado = event.target.value; //.split(',').join("");
    if (!montoSolicitado) {
      this.solicitudOrden.cuotaMes = 0;
      return;
    }
    this.onDebouncer.next(montoSolicitado);
  }

  /**
   * vuelve a calcular la cuota mensual si cambia el valor de la cuota en el combo
   * @returns 
   */
  recalcularCuotaMensual(){
    if(!this.solicitudOrden.montoSolicitado){
      return;
    }
    //this.solicitudOrden.montoSolicitado = this.solicitudOrden.montoSolicitado.split(',').join("");
    this.onDebouncer.next(parseInt(this.solicitudOrden.montoSolicitado));
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
    if (role === 'confirm' && isCss) {
      this.init();//inicializa los valores en los campos
    }
  }
  formatNumber (num:any) {
    if(!num.detail.value){
      this.importeFormateado = '';
      return;
    }
    
    this.onDebouncerSeparadorMiles.next(num.detail.value);
}
 /*  format(valString:any):any {
    if (!valString) {
        return '';
    }
    let val = valString.toString();
    const parts = this.unFormat(val).split(this.DECIMAL_SEPARATOR);
    return parts[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, this.GROUP_SEPARATOR) + (!parts[1] ? '' : this.DECIMAL_SEPARATOR + parts[1]);
};

unFormat(val) {
  if (!val) {
      return '';
  }
  val = val.replace(/^0+/, '');

  if (this.GROUP_SEPARATOR === ',') {
      return val.replace(/,/g, '');
  } else {
      return val.replace(/\./g, '');
  }
}; */
}
