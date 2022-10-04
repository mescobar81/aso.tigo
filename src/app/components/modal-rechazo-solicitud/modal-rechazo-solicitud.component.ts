import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController, PopoverController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-modal-rechazo-solicitud',
  templateUrl: './modal-rechazo-solicitud.component.html',
  styleUrls: ['./modal-rechazo-solicitud.component.scss'],
})
export class ModalRechazoSolicitudComponent implements OnInit {

  motivoRechazo:string = '';
  constructor(private modalCtrl: ModalController,
              private toastCtrl:ToastController) { }

  ngOnInit() {}

  confirm(fRechazo:NgForm){
    if(!fRechazo.valid){
      this.presentToast('bottom');
      return;
    }
    this.modalCtrl.dismiss(this.motivoRechazo, 'confirm');
  }

  cancel(){
    this.modalCtrl.dismiss(null, 'cancel');
  }

  async presentToast(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastCtrl.create({
      message: '¡Favor ingresar motivo de rechazo!',
      duration: 2200,
      position: position,
      icon:'information-circle',
      cssClass:'custom-toast'
    });

    await toast.present();
  }
}
