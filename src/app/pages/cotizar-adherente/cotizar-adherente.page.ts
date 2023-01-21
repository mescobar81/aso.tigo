import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ModalController, NavController, ToastController } from '@ionic/angular';
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
  titulo:String = "";
  cantidad:number = 1;
  importeTotal:number = 0;
  formasPago: FormasPago[] = [];
  grupoFamiliar!:NuevoGrupoFamiliar;
  formaPago!:FormasPago;
  gruposFamiliar:NuevoGrupoFamiliar[] =  [];
  adherentes:Adherente[] = [];
  adherentesAgregado:Adherente[] = [];
  adherenteAuxiliar = [];
  constructor(private coberturaMedicaSvr: CoberturaMedicaService,
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController,
    private modalCtrl:ModalController,
    private toastCtrl: ToastController,
    private formaPagoSvr:SolicitudOrdenService,
    private storageService:StorageService) {
   }

  async ngOnInit() {
    const {Nomserv, codigo, Popcion, idplan, codsegmento, beneficio} = await this.storageService.getDatoBeneficiarioAdherente();
    this.formasPago =  (await this.formaPagoSvr.listarFormasDePagos()).FormasPago;
    this.titulo = Nomserv;
    this.gruposFamiliar =  (await this.coberturaMedicaSvr.getNuevoGrupoFamiliar(codigo, codsegmento, idplan, beneficio, Popcion)).NuevoGrupoFamilia;
    this.adherentes =  (await this.coberturaMedicaSvr.obtenerAdherentes(idplan)).Adherente;
  }

  async cotizar(fCotizar:NgForm){
    console.log(fCotizar.invalid);
    if(fCotizar.invalid){
      this.presentToast('bottom', 'Favor. Ingresar campos requeridos');
      return;
    }
    const nroSolicitud = await this.storageService.getNroSolicitud();
    const {nroSocio, nombre} = await this.storageService.getUsuario();
    const cotizacion = {
      nroSocio: Number(nroSocio),
      nombre,
      nroSolicitud,
      importeTotal: this.importeTotal,
      formaPago:this.formaPago.formaPagoId,
      codigoGrupoFamilia:this.grupoFamiliar.Nuevocodigo,
      montoGrupoFamilia:this.grupoFamiliar.Monto,
      adherentes:this.adherentesAgregado
    };
    console.log(cotizacion);

    /*const {mensaje, status} = await this.coberturaMedicaSvr.enviarCotizacion(cotizacion);
    if(status == 'success'){
      this.presentarModal('Cotización', mensaje, true);
    }else{
      this.presentarModal('Cotización', mensaje, false);
    } */
  }

  agregarAdherente(e:any){
    const adherente:Adherente[] = e.detail.value;
    this.adherenteAuxiliar = [];
    this.importeTotal = 0;
    this.adherentesAgregado = adherente;
    this.adherentesAgregado.forEach(a =>{
      this.adherenteAuxiliar.push({Monto:a.Monto});
      this.importeTotal += a.Monto;
    });

  }

  incrementarValor(indice:number){
    let inputComponente:any = document.getElementById(`${indice}`);
    let montoInicial = this.adherenteAuxiliar[indice].Monto;

    let montoIncrementado = this.adherentesAgregado[indice].Monto;
    for(let i = 0; i < this.adherentesAgregado.length; i++){
      if(i === parseInt(inputComponente.id)){
        let cantidad = inputComponente.value;
        ++cantidad;
        inputComponente.value = cantidad;
        montoIncrementado+=montoInicial;
        this.adherentesAgregado[indice].Monto = montoIncrementado;
        this.importeTotal += montoInicial;
        break;
      }
    }
  }

  decrementarValor(indice:number) {
    const inputComponente:any = document.getElementById(`${indice}`);

    if( inputComponente.value <= 1){
      return;
    }
    let montoInicial = this.adherenteAuxiliar[indice].Monto;

    let montoDecrementado = this.adherentesAgregado[indice].Monto;

    for(let i = 0; i < this.adherentesAgregado.length; i++){
      if(i === parseInt(inputComponente.id)){
        let cantidad = inputComponente.value;
        --cantidad;
        inputComponente.value = cantidad;
        montoDecrementado-=montoInicial;
        this.adherentesAgregado[indice].Monto = montoDecrementado;
        this.importeTotal -= montoInicial;
        break;
      }
    }
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
}
