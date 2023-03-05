import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-show-image',
  templateUrl: './modal-show-image.component.html',
  styleUrls: ['./modal-show-image.component.scss'],
})
export class ModalShowImageComponent implements OnInit {

  @Input() image:any = null;
  constructor(private modalCtrl:ModalController) { }

  ngOnInit() {}

  cerrar(){
    this.modalCtrl.dismiss(null, 'cerrar');
  }

}
