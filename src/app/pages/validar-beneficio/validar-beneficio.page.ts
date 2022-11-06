import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { ModalInfoComponent } from 'src/app/components/modal-info/modal-info.component';
import { CoberturaMedicaService } from 'src/app/services/cobertura-medica.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-validar-beneficio',
  templateUrl: './validar-beneficio.page.html',
  styleUrls: ['./validar-beneficio.page.scss'],
})
export class ValidarBeneficioPage {

  title:string = 'Validar Beneficio';
  constructor(private activatedRoute: ActivatedRoute,
    private navCtrl: NavController,
    private coberturaMedicaSrv:CoberturaMedicaService,
    private storageSrv: StorageService,
    private modalCtrl: ModalController) { }

    async consultarBeneficio(){
    const {nroSocio, nombre} = await this.storageSrv.getUsuario();
    const {status, mensaje} = await this.coberturaMedicaSrv.solicitarBeneficio(Number(nroSocio), nombre);

    if(status === 'success'){
      this.presentarModal('Consulta de Beneficio', mensaje, true);
    } else {
      this.presentarModal('Consulta de Beneficio', mensaje, false);
    }
  }

  async presentarModal(title:string, descripcion:string, isCss:boolean){
    const modal = await this.modalCtrl.create({
      component:ModalInfoComponent,
      componentProps:{
        descripcion,
        title,
        isCss
      }
    });

    await modal.present();

    const {role} = await modal.onWillDismiss();
    if(role === 'confirm'){
      this.navCtrl.navigateRoot('/inicio/menu-cobertura');
    }
  }
}
