import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonSelectOption, ModalController, NavController, ToastController } from '@ionic/angular';
import { ModalInfoComponent } from 'src/app/components/modal-info/modal-info.component';

import { Adherente, FormasPago, GrupoFamilia, Plane, PopoverItem } from 'src/app/interfaces/interface';
import { CoberturaMedicaService } from 'src/app/services/cobertura-medica.service';
import { SolicitudOrdenService } from 'src/app/services/solicitud-orden.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-cotizar-plan',
  templateUrl: './cotizar-plan.page.html',
  styleUrls: ['./cotizar-plan.page.scss'],
})
export class ConsultarBeneficioPage implements OnInit {

  @ViewChild('planFamiliar') planFamiliar:IonSelectOption;
  @ViewChild('grupoFamiliar') grupoFamiliar:IonSelectOption;
  @ViewChild('beneficiarioAdherente') beneficiarioAdherente:IonSelectOption;
  etiquetaGrupoFamiliar:string = '';
  etiquetaPlanFamiliar:string = '';
  etiquetaBeneficiarioAdherente:string = '';
  adherentesAuxiliar:any[] = [];
  items: PopoverItem[] = [{
    id: 1,
    title: 'Cámara',
    route: '',
    icon: 'camera',
    enabled: true
  },
  {
    id: 2,
    title: 'Documento',
    route: '',
    icon: 'document-attach',
    enabled: true
  }
  ];

  validaInscripcion = {
    beneficio:'',
    codigoRetorno:0
  }
  importeTotal: number = 0;
  grupoFamilia!: GrupoFamilia;
  formaPago!: FormasPago;

  adherente: Adherente = {
    codigo: 0,
    Monto: 0,
    DescripSevi: ''
  }

  planes: Plane[] = [];
  gruposFamilia: GrupoFamilia[] = [];

  formasPago: FormasPago[] = [];
  adherenteBeneficiarios: Adherente[] = [];
  adherentes: any[] = [];
  constructor(private coberturaMedicaSrv: CoberturaMedicaService,
    private solicitudOrdenSvr: SolicitudOrdenService,
    private navCtrl: NavController,
    private toastCtrl: ToastController,
    private modalCtrl: ModalController,
    private storageSrv: StorageService) { }

  async ngOnInit() {
    const {beneficio, codigoRetorno} =  await this.storageSrv.getValidaInscripcion(); //this.activatedRoute.snapshot.params.beneficio;
    this.validaInscripcion.codigoRetorno = codigoRetorno;
    this.validaInscripcion.beneficio = beneficio;
    const { Planes } = await this.coberturaMedicaSrv.listarPlanes();
    this.planes = Planes;

    const { FormasPago } = await this.solicitudOrdenSvr.listarFormasDePagos();
    this.formasPago = FormasPago;
  }

  seleccionarPlan() {
    const plan:Plane = this.planFamiliar.value;
    console.log(plan);
    this.etiquetaPlanFamiliar = plan.descPlan;
    this.etiquetaGrupoFamiliar = '';
    this.listarGrupoFamiliarByPlan(this.validaInscripcion.beneficio, plan);
    this.listarAdherentes(plan);
  }

  async listarGrupoFamiliarByPlan(beneficio: string, plan: Plane) {
    this.gruposFamilia = (await this.coberturaMedicaSrv.listarGrupoFamiliarByPlan(beneficio, plan.idplan)).GrupoFamilia;
    console.log('GRUPO FAMILIAR:', this.gruposFamilia);
  }

  SeleccionarGrupoFamiliar(){
    this.etiquetaGrupoFamiliar = this.grupoFamiliar.value.DescripSevi;
    console.log('IMPORTE GRUPO FAMILIA:', this.grupoFamilia.Monto);
    
    this.importeTotal = this.grupoFamilia.Monto;
    this.etiquetaBeneficiarioAdherente = '';
  }
  async listarAdherentes(plan: Plane) {
    this.adherenteBeneficiarios =  (await this.coberturaMedicaSrv.listarAdherentes(plan.idplan)).Adherente;
  }

  seleccionarBeneficiarioAdherente(){
    this.etiquetaBeneficiarioAdherente = this.beneficiarioAdherente.value.DescripSevi;
    const importeBeneficiarioAdherente = this.beneficiarioAdherente.value.Monto;
    this.importeTotal += importeBeneficiarioAdherente;

    this.adherentes.push({
      codigo:this.adherente.codigo,
      monto: this.adherente.Monto,
      descripServi: this.adherente.DescripSevi
    });

    this.adherentes.forEach(a =>{
      this.adherentesAuxiliar.push({
        codigo: a.codigo,
        monto: a.monto,
        descripServi: a.descripServi
      });
    });
    console.log(this.adherentesAuxiliar);
    
  }
  agregarAdherente() {
    if (!this.adherente.codigo) {
      return;
    }
    //agrega los datos del adherente para mostrar en la grilla
    this.adherentes.push({
      codigo:this.adherente.codigo,
      monto: this.adherente.Monto,
      descripServi: this.adherente.DescripSevi
    });
    //actualiza el importe total
    this.importeTotal = this.actualizarImporteTotal();

  }

  decrementarValor(indice:number){
    let inputComponente:any = document.getElementById(`${indice}`);

    if( inputComponente.value <= 1){
      return;
    }
    const montoInicial = this.adherentesAuxiliar[indice].monto;
    console.log('MONTO INICIAL:',montoInicial);
    
    let montoDecrementado = this.adherentes[indice].monto;
    console.log('MONTO DECREMENTADO:', montoDecrementado);
    
    for(let i = 0; i < this.adherentes.length; i++){
      if(i === parseInt(inputComponente.id)){
        let cantidad = inputComponente.value;
        --cantidad;
        inputComponente.value = cantidad;
        montoDecrementado-=montoInicial;
        //actualiza el monto en el arreglo de adherentes
        this.adherentes[indice].monto = montoDecrementado;
        //actualiza el monto mientras se presiona en los botonnes
        this.importeTotal -= montoInicial;
        break;
      }
    }
  }

  incrementarValor(indice:number){
    let inputComponente:any = document.getElementById(`${indice}`);
    const montoInicial = this.adherentesAuxiliar[indice].monto;
    console.log('MONTO INICIAL:',montoInicial);
    let montoIncrementado = this.adherentes[indice].monto;

    console.log('MONTO INCREMENTADO:', montoIncrementado);
    for(let i = 0; i < this.adherentes.length; i++){
      if(i === parseInt(inputComponente.id)){
        let cantidad = inputComponente.value;
        ++cantidad;
        inputComponente.value = cantidad;
        montoIncrementado+=montoInicial;
        this.adherentes[indice].monto = montoIncrementado;
        this.importeTotal += montoInicial;
        break;
      }
    }
  }

  eliminarAdherente(index: number) {

    this.adherentes.splice(index, 1);
    this.etiquetaBeneficiarioAdherente = '';
    //actualiza el importe total despues de eliminar un adherente
    this.importeTotal = this.grupoFamiliar.value.Monto;

  }

  async enviarCotizacion(fCotizar: NgForm) {

    if(!this.planFamiliar.value){
      this.presentToast('bottom','Seleccione Plan Familiar');
      return;
    }

    if(!fCotizar.value.grupoFamilia){
      this.presentToast('bottom','Seleccione Grupo Familiar');
      return;
    }
    
    if(!fCotizar.value.formaPago){
      this.presentToast('bottom','Seleccione Forma de Pago');
      return;
    }
   const { nroSocio, nombre } = await this.storageSrv.getUsuario();
    const nroSolicitud = await this.storageSrv.getNroSolicitud();
    let adherentes = [];
    this.adherentes.forEach((a: any) => {
      adherentes.push({
        codigo: a.codigo,
        monto: a.monto
      });
    });

    const cotizar = {
      nroSocio: Number(nroSocio),
      nombre: nombre,
      nroSolicitud: nroSolicitud,
      importeTotal: this.importeTotal,
      formaPago: this.formaPago.formaPagoId,
      codigoGrupoFamilia: this.grupoFamilia.codigo,
      montoGrupoFamilia: this.grupoFamilia.Monto,
      adherentes: adherentes
    }

    console.log(cotizar);
    

     const { status, mensaje } = await this.coberturaMedicaSrv.enviarCotizacion(cotizar);
    if (status === 'success') {
      this.presentarModal('Solicitud de cotización', mensaje, true);
    } else {
      this.presentarModal('Solicitud de cotización', mensaje, false);
    }

  }

  actualizarImporteTotal(): number {
    this.importeTotal = 0;
    this.adherentes.forEach((a: any) => {
      this.importeTotal += a.monto
    });

    return this.importeTotal;
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
      this.navCtrl.navigateRoot(`adjuntar-documento/${this.validaInscripcion.codigoRetorno}`);
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
