import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ModalController, NavController, ToastController } from '@ionic/angular';
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

  beneficio: string = '';
  importeTotal: number = 0;
  grupoFamilia!: GrupoFamilia;
  formaPago!: FormasPago;
  plan: Plane = {
    idplan: '',
    descPlan: ''
  };
  adherente: Adherente = {
    codigo: 0,
    Monto: 0,
    DescripSevi: ''
  }

  planes: Plane[] = [];
  gruposFamilia: GrupoFamilia[] = [];

  formasPago: FormasPago[] = [];
  adherenteBeneficiarios: Adherente[] = [];
  adherentes: any = [];
  constructor(private coberturaMedicaSrv: CoberturaMedicaService,
    private solicitudOrdenSvr: SolicitudOrdenService,
    private navCtrl: NavController,
    private toastCtrl: ToastController,
    private modalCtrl: ModalController,
    private storageSrv: StorageService,
    private activatedRoute: ActivatedRoute) { }

  async ngOnInit() {
    this.beneficio = this.activatedRoute.snapshot.params.beneficio;
    const { Planes } = await this.coberturaMedicaSrv.listarPlanes();
    this.planes = Planes;

    const { FormasPago } = await this.solicitudOrdenSvr.listarFormasDePagos();
    this.formasPago = FormasPago;
  }

  seleccionarPlan() {

    this.listarGrupoFamiliarByPlan(this.beneficio, this.plan);
    this.listarAdherentes(this.plan);
  }

  async listarGrupoFamiliarByPlan(beneficio: string, plan: Plane) {
    const { GrupoFamilia } = await this.coberturaMedicaSrv.listarGrupoFamiliarByPlan(beneficio, plan.idplan);
    this.gruposFamilia = GrupoFamilia;

  }

  async listarAdherentes(plan: Plane) {
    const { Adherente } = await this.coberturaMedicaSrv.listarAdherentes(plan.idplan);

    this.adherenteBeneficiarios = Adherente;
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

  eliminarAdherente(index: number) {

    this.adherentes.splice(index, 1);
    //actualiza el importe total despues de eliminar un adherente
    this.importeTotal = this.actualizarImporteTotal();

  }

  async enviarCotizacion(fCotizar: NgForm) {

    if (this.adherentes.length === 0 || fCotizar.invalid) {
      this.presentToast('bottom','Agregue Adherente');
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
      this.navCtrl.navigateRoot('/inicio/adjuntar-documento');
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
