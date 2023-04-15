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
  beneficio:string = '';
  plan:Plane = null;
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
  montoGrupoFamiliar:number = 0;
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
    this.beneficio = beneficio;
    this.validaInscripcion.codigoRetorno = codigoRetorno;
    this.validaInscripcion.beneficio = beneficio;
    this.planes = (await this.coberturaMedicaSrv.listarPlanes()).Planes;
    const { FormasPago } = await this.solicitudOrdenSvr.listarFormasDePagos();
    this.formasPago = FormasPago;
  }

  async seleccionarPlan() {
    this.adherenteBeneficiarios = [];
    this.gruposFamilia =  [];
    this.plan = this.planFamiliar.value;
    this.gruposFamilia = (await this.coberturaMedicaSrv.listarGrupoFamiliarByPlan(this.beneficio, this.plan.idplan)).GrupoFamilia;
    this.adherenteBeneficiarios =  (await this.coberturaMedicaSrv.listarAdherentes(this.plan.idplan)).Adherente;
    //this.listarAdherentes(plan);
    this.etiquetaPlanFamiliar = this.plan.descPlan;
    this.etiquetaGrupoFamiliar = '';
  }

  async listarGrupoFamiliarByPlan(beneficio: string, plan: Plane) {
    /* this.gruposFamilia = (await this.coberturaMedicaSrv.listarGrupoFamiliarByPlan(beneficio, plan.idplan)).GrupoFamilia;
    console.log('GRUPO FAMILIAR:', this.gruposFamilia); */
  }

  async SeleccionarGrupoFamiliar(){
    console.log('GrupoFamiliar');
    if(!this.planFamiliar.value){
      return;
    }

    if(this.gruposFamilia.length == 0){
      this.gruposFamilia = (await this.coberturaMedicaSrv.listarGrupoFamiliarByPlan(this.beneficio, this.plan.idplan)).GrupoFamilia;
    }
    this.montoGrupoFamiliar = this.grupoFamilia?.Monto;
    this.etiquetaGrupoFamiliar = this.grupoFamiliar.value.DescripSevi;
    this.actualizarImporteTotal();
    this.etiquetaBeneficiarioAdherente = '';
  }

  async listarAdherentes(plan: Plane) {
    this.adherenteBeneficiarios =  (await this.coberturaMedicaSrv.listarAdherentes(plan.idplan)).Adherente;
  }

  seleccionarBeneficiarioAdherente(e:any){
    this.adherentes = [];
    e.detail.value.forEach(a =>{
      this.adherentes.push({
        codigo:a.codigo,
        monto: a.Monto,
        descripServi: a.DescripSevi,
        montoBase:a.Monto,
        cantidadAdherente:1
      });
    });
    
    console.log('Adherentes:', this.adherentes);

    this.etiquetaBeneficiarioAdherente = this.beneficiarioAdherente.value.DescripSevi;
    this.actualizarImporteTotal();

    
  }

  decrementarValor(indice:number){
    let inputComponente:any = document.getElementById(`${indice}`);

    if( inputComponente.value <= 1){
      return;
    }
    const montoInicial = this.adherentes[indice].montoBase; //this.adherentesAuxiliar[indice].monto;
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
        this.adherentes[indice].cantidadAdherente = cantidad;
        break;
      }
    }
    //actualiza el importe total
    this.actualizarImporteTotal();
  }

  incrementarValor(indice:number){
    let inputComponente:any = document.getElementById(`${indice}`);
    const montoInicial = this.adherentes[indice].montoBase; //this.adherentesAuxiliar[indice].monto;
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
        this.adherentes[indice].cantidadAdherente = cantidad;
        break;
      }
    }
    this.actualizarImporteTotal();
  }

  eliminarAdherente(index: number) {

    this.adherentes.splice(index, 1);
    this.etiquetaBeneficiarioAdherente = '';
    //actualiza el importe total despues de eliminar un adherente
    this.actualizarImporteTotal();

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
      if(a.cantidadAdherente > 1){
        for(let i = 1; i <= a.cantidadAdherente; i++){
          adherentes.push({ 
            codigo:a.codigo,
            monto:a.monto
          });
        }
      }else{
        adherentes.push({
          codigo: a.codigo,
          monto: a.monto
        });
      }
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
  
    this.coberturaMedicaSrv.enviarCotizacion(cotizar).then(res =>{
      if (res.status == 'success') {
        this.presentarModal('Solicitud de cotización', res.mensaje, true);
      } else {
        this.presentarModal('Solicitud de cotización', res.mensaje, false);
      }
    });
  }

  actualizarImporteTotal() {
    //actualiza el importe inicial del grupo familia seleccionado
    this.importeTotal = this.grupoFamilia?.Monto;

    //actualiza el importe base del grupo familia mas el monto del arreglo adherentes
    this.adherentes.forEach((a: any) => {
      this.importeTotal += a.monto
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
    if(role == 'confirm' && isCss) {
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
