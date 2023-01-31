import { Component, OnInit } from '@angular/core';
import { File } from '@awesome-cordova-plugins/file/ngx';
import { ModalController, ToastController } from '@ionic/angular';
import { ModalInfoComponent } from 'src/app/components/modal-info/modal-info.component';
import { CoberturaMedicaService } from 'src/app/services/cobertura-medica.service';
import { StorageService } from 'src/app/services/storage.service';
import { NuevoGrupoFamiliar } from '../../interfaces/interface';

@Component({
  selector: 'app-opcion-baja-parcial',
  templateUrl: './opcion-baja-parcial.page.html',
  styleUrls: ['./opcion-baja-parcial.page.scss'],
})
export class OpcionBajaParcialPage implements OnInit {

  file!: File;
  nomserv: string = '';
  adherente: any = {};
  adherentesExcluido: any[] = [];
  solicitudAdjuntados: any[] = [];
  gruposFamiliar: NuevoGrupoFamiliar[] = [];
  grupoFamiliar?: NuevoGrupoFamiliar;
  conyugue: string = 'N';
  hijo: string = 'N';
  blob!: any;
  constructor(private storageService: StorageService,
    private toastCtrl: ToastController,
    private modalCtrl: ModalController,
    private coberturaMedicaService: CoberturaMedicaService) { }

  async ngOnInit() {
    const { Nomserv } = await this.storageService.getValidacionBaja();
    const { nroSocio } = await this.storageService.getUsuario();

    this.nomserv = Nomserv;
    this.adherente = await this.coberturaMedicaService.listarAdherenteBySocio(nroSocio);
    const { codigo, codsegmento, idplan, beneficio, Popcion } = await this.storageService.getValidacionBaja();
    this.gruposFamiliar = (await this.coberturaMedicaService.getNuevoGrupoFamiliar(codigo, codsegmento, idplan, beneficio, Popcion)).NuevoGrupoFamilia;

    let quitarEspacio = JSON.stringify(this.adherente);

    let adherenteSinEspacio: any = quitarEspacio.replace('Adherente Socio', 'AdherenteSocio');
    this.adherente = JSON.parse(adherenteSinEspacio);

  }

  seleccionarConyugue(e: any) {
    if (e.detail.checked) {
      this.conyugue = 'S';
      return;
    }
    this.conyugue = 'N';
  }

  seleccionarHijo(e: any) {
    if (e.detail.checked) {
      this.hijo = 'S';
      return;
    }
    this.hijo = 'N';
  }

  seleccionarGrupoFamiliar(e: any) {
    this.grupoFamiliar = e.detail.value;
    console.log(this.grupoFamiliar);

  }

  excluirAdherente(e: any) {
    if (e.detail.checked) {
      this.adherentesExcluido.push({codigo:e.detail.value.codigo});
    } else {
      for (let i = 0; i < this.adherentesExcluido.length; i++) {
        if (e.detail.value.codigo === this.adherentesExcluido[i].codigo) {
          this.adherentesExcluido.splice(i, 1);//sacamos el adherente del indice especificado
          break;
        }
      }
    }

  }

  eliminarAdjunto(indice: number) {
    this.solicitudAdjuntados.splice(indice, 1);
  }

  seleccionarArchivo(e: any) {
    this.solicitudAdjuntados = [];
    this.file = e.target.files[0];
    this.blob = this.file;
    this.solicitudAdjuntados.push({ name: e.target.files[0].name });

  }

  async enviarSolicitud() {
   if(!this.grupoFamiliar){
      this.presentToast('bottom', '¡Incluir integrante grupo familiar!');
      return;
    }
    if (this.solicitudAdjuntados.length === 0) {
      this.presentToast('bottom', '¡Agregue solicitud de baja antes de enviar!');
      return;
    }
    if (this.adherentesExcluido.length === 0) {
      this.presentToast('bottom', '¡Seleccione al menos un adherente!');
      return;
    }

    const { nroSolicitud } = await this.storageService.getValidacionBaja();
    const { nroSocio, nombre } = await this.storageService.getUsuario();
    const { codigo, codsegmento } = await this.storageService.getValidacionBaja();
    const formData = new FormData();

    const json = {
      "SegmentoGrupoFamilia": codsegmento,
      "codigoGrupoFamilia": codigo,
      "NuevocodigoGrupoFamilia": this.grupoFamiliar.Nuevocodigo,
      "NuevoSegmentoGrupoFamilia": this.grupoFamiliar.Nuevosegmento,
      "conyugue":this.conyugue,
      "hijo":this.hijo,
      "adherentes": this.adherentesExcluido
    };
    
    formData.append('file', this.blob, this.solicitudAdjuntados[0].name);
    formData.append('nroSolicitud', nroSolicitud);
    formData.append('nroSocio', nroSocio);
    formData.append('nombre', nombre);
    formData.append('json', `"${JSON.stringify(json)}"`);

    console.log(formData.get('file'));
    console.log(formData.get('nroSolicitud'));
    console.log(formData.get('nroSocio'));
    console.log(formData.get('nombre'));
    console.log(formData.get('json'));
    
    try {
      //const {status, mensaje, nroSolicitud} = await this.coberturaMedicaService.enviarSolicitudBajaParcial(formData);
      this.coberturaMedicaService.enviarSolicitudBajaParcial(formData).subscribe(resp =>{
        if(resp.status === 'success'){
          this.presentarModal('Baja Parcial', resp.mensaje, true);
        }else{
          this.presentarModal('Baja Parcial', resp.mensaje, false);
        }
      });
      /*if (status === 'success') {
        this.presentarModal('Baja Parcial', mensaje, true);
      } else {
        this.presentarModal('Baja Parcial', mensaje, false);
      }*/
    } catch (error) {
      this.presentarModal('Baja Parcial', JSON.stringify(error), false);
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
  }

  async presentToast(position: 'top' | 'middle' | 'bottom', mensaje: string) {
    const toast = await this.toastCtrl.create({
      message: mensaje,
      duration: 2200,
      position: position,
      icon: 'warning',
      cssClass: ['toast-menu-cobertura']
    });

    await toast.present();
  }
}
