import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-info',
  templateUrl: './modal-info.component.html',
  styleUrls: ['./modal-info.component.scss'],
})
export class ModalInfoComponent implements OnInit {

  @Input() descripcion:string;
  @Input() title:string;
  @Input() isCss:boolean = false;
  constructor(private modalCtrl:ModalController) { }

  ngOnInit() {}
  
  getCssImg(){
    return this.isCss == true ? 'container__img':'container--img';
  }

  getColorPrimary(){
    return this.isCss == true ? 'success':'danger';
  }
  cerrarModal(){
    this.modalCtrl.dismiss();
  }
}
