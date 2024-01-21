import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IonSelect, LoadingController, ModalController, NavController, ToastController } from '@ionic/angular';
import { ModalInfoComponent } from 'src/app/components/modal-info/modal-info.component';
import { Adherente, FormasPago, NuevoGrupoFamiliar } from 'src/app/interfaces/interface';
import { CoberturaMedicaService } from 'src/app/services/cobertura-medica.service';
import { SolicitudOrdenService } from 'src/app/services/solicitud-orden.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-cotizar-adherente',
  templateUrl: './cotizar-adherente.page.html',
  styleUrls: ['./cotizar-adherente.page.scss'],
})
export class CotizarAdherentePage implements OnInit {

  @ViewChild('grupoFamilia') grupoFamilia:IonSelect;
  titulo:String = "";
  cantidad:number = 1;
  importeTotal:number = 0;
  montoGrupoFamiliar:number = 0;
  formasPago: FormasPago[] = [];
  grupoFamiliar:NuevoGrupoFamiliar = {
    Nuevocodigo:0,
    DescripSevi:'',
    Monto:0,
    Nuevosegmento:''
  };
  formaPago!:FormasPago;
  gruposFamiliar:NuevoGrupoFamiliar[] =  [];
  adherentes:Adherente[] = [];
  adherentesAgregado:any[] = [];
  adherenteAuxiliar = [];
  codigoSegmento:string = '';
  nroSolicitud:number = 0;
  codigoGrupoFamilia:number = 0;
  conyugue:string = '';
  hijo:string = '';
  constructor(private coberturaMedicaSvr: CoberturaMedicaService,
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController,
    private modalCtrl:ModalController,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private formaPagoSvr:SolicitudOrdenService,
    private storageService:StorageService) {
   }

  async ngOnInit() {
    const {Nomserv, codigo, Popcion, idplan, codsegmento, beneficio} = await this.storageService.getDatoBeneficiarioAdherente();
    const nroSolicitud = await this.storageService.getNroSolicitud();
    this.nroSolicitud = parseInt(nroSolicitud);
    this.codigoGrupoFamilia = codigo;
    this.codigoSegmento = codsegmento;
    this.titulo = Nomserv;
    this.listarFormasDePago();
    this.listarGruposFamiliar(codigo, codsegmento, idplan, beneficio, Popcion);
    this.listarAdherentes(idplan);
  }

  async listarFormasDePago(){
    this.formasPago =  (await this.formaPagoSvr.listarFormasDePagos()).FormasPago;
  }

  async listarGruposFamiliar(codigo:string, codSegmento:string, idPlan:string, beneficio:string, pOpcion:string){

    this.gruposFamiliar =  (await this.coberturaMedicaSvr.getNuevoGrupoFamiliar(codigo, codSegmento, idPlan, beneficio, pOpcion)).NuevoGrupoFamilia;
  }

  async listarAdherentes(idplan:string){
    this.adherentes =  (await this.coberturaMedicaSvr.obtenerAdherentes(idplan)).Adherente;
  }

  seleccionarGrupoFamiliar(e:any){
    //actualiza el importe base del grupo familia
    this.actualizarImporteTotal();
    this.grupoFamiliar = e.detail.value;
    this.montoGrupoFamiliar = e.detail.value.Monto;
  }

  seleccionarConyugue(e:any){
     if(e.detail.checked){
      this.conyugue = 'S';
      return;
     }
     this.conyugue = 'N';
  }

  seleccionarHijo(e:any){
    if(e.detail.checked){
      this.hijo = 'S';
      return;
    }
    this.hijo = 'N';
  }

  async cotizar(fCotizar:NgForm){

    if(this.importeTotal == 0){
      this.presentToast('bottom', '¡Favor!. Seleccionar Grupo familiar y/o Adherente');
      return;
    }

    if(fCotizar.invalid){
      this.presentToast('bottom', '¡Favor!. Seleccionar forma de pago');
      return;
    }
    
    const {nroSocio, nombre} = await this.storageService.getUsuario();

    const adherentesAEnviar = [];

    this.adherentesAgregado.forEach(a =>{
       if(a.cantidadAdherente > 1){
          for(let i = 0; i < a.cantidadAdherente; i++){
            adherentesAEnviar.push({
              codigo:a.codigo,
              Monto:a.Monto,
              DescripSevi:a.DescripSevi,
            });
          }
       }else{
        adherentesAEnviar.push({
          codigo:a.codigo,
          Monto:a.Monto,
          DescripSevi:a.DescripSevi,
        });
       }
    });
    const cotizacion = {
      nroSocio: Number(nroSocio),
      nombre,
      nroSolicitud:this.nroSolicitud,
      importeTotal: this.importeTotal,
      formaPago:this.formaPago.formaPagoId,
      codigoGrupoFamilia:this.codigoGrupoFamilia,
      SegmentoGrupoFamilia:this.codigoSegmento,
      NuevocodigoGrupoFamilia:this.grupoFamiliar.Nuevocodigo,
      NuevoDescripSeviGrupoFamilia:this.grupoFamiliar.DescripSevi,
      NuevoSegmentoGrupoFamilia:this.grupoFamiliar.Nuevosegmento,
      NuevomontoGrupoFamilia:this.grupoFamiliar.Monto,
      adherentes:adherentesAEnviar,
      conyugue:this.conyugue,
      hijo:this.hijo
    };
    this.showLoading('Aguarde. Procesando...');
    try {
      const {mensaje, status, nroSolicitud} = await this.coberturaMedicaSvr.enviarCotizacionAdhrente(cotizacion);
    if(status == 'success'){
      this.loadingCtrl.dismiss();
      await this.storageService.guardarNroSolicitud(parseInt(nroSolicitud));
      this.presentarModal('Cotización', mensaje, true);
    }else{
      this.loadingCtrl.dismiss();
      this.presentarModal('Cotización', mensaje, false);
    }
    } catch (error) {
      this.loadingCtrl.dismiss();
      console.log(JSON.stringify(error));
      this.presentarModal('Cotizar Adherente', error, false);
    }
  }

  agregarAdherente(e:any){

    this.adherentesAgregado = [];
    e.detail.value.forEach((a) =>{
      let adherenteAgregado = {
        codigo:a.codigo,
        Monto:a.Monto,
        montoBase:a.Monto,
        DescripSevi:a.DescripSevi,
        cantidadAdherente:1
      }
      this.adherentesAgregado.push(adherenteAgregado);
    });
    //actualizamos el importe
    this.actualizarImporteTotal();

  }

  incrementarValor(indice:number){
    let inputComponente:any = document.getElementById(`${indice}`);
    let montoInicial = this.adherentesAgregado[indice].montoBase; //this.adherenteAuxiliar[indice].Monto;

    let montoIncrementado = this.adherentesAgregado[indice].Monto;
    for(let i = 0; i < this.adherentesAgregado.length; i++){
      if(i === parseInt(inputComponente.id)){
        let cantidad = inputComponente.value;
        ++cantidad;
        inputComponente.value = cantidad;
        montoIncrementado+=montoInicial;
        this.adherentesAgregado[indice].Monto = montoIncrementado;
        this.adherentesAgregado[indice].cantidadAdherente = cantidad;
        break;
      }
    }

    this.actualizarImporteTotal();
  }

  decrementarValor(indice:number) {
    const inputComponente:any = document.getElementById(`${indice}`);

    if( inputComponente.value <= 1){
      return;
    }
    let montoInicial = this.adherentesAgregado[indice].montoBase; //this.adherenteAuxiliar[indice].Monto;

    let montoDecrementado = this.adherentesAgregado[indice].Monto;

    for(let i = 0; i < this.adherentesAgregado.length; i++){
      if(i === parseInt(inputComponente.id)){
        let cantidad = inputComponente.value;
        --cantidad;
        inputComponente.value = cantidad;
        montoDecrementado-=montoInicial;
        //actualiza el monto en el arreglo de adherentes
        this.adherentesAgregado[indice].Monto = montoDecrementado;
        this.adherentesAgregado[indice].cantidadAdherente = cantidad;
        break;
      }
    }

    this.actualizarImporteTotal();
  }

  eliminarAdherente(indice:number){
    this.adherentesAgregado.splice(indice, 1);
    this.actualizarImporteTotal();
  }

  actualizarImporteTotal(){
    //actualizamos el importe base al importe total mas los montos agregados del adherente
    this.importeTotal = this.grupoFamiliar.Monto;
    this.adherentesAgregado.forEach(a =>{
      this.importeTotal += a.Monto;
    });
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

    await modal.present();
    const {role} = await modal.onWillDismiss();
    if(role === 'confirm' && isCss) {
      this.navCtrl.navigateRoot(`adjuntar-documento/${this.activatedRoute.snapshot.params.codigoRetorno}`);
    }
  }

  async presentToast(position:'top' | 'middle' | 'bottom', message: string){
    const toast = await this.toastCtrl.create({
      message:message,
      duration: 2200,
      position: position,
      icon:'information-circle',
      cssClass:'custom-toast'
    });

    await toast.present();
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
