import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-inscripcion-medica-rechazo',
  templateUrl: './inscripcion-medica-rechazo.page.html',
  styleUrls: ['./inscripcion-medica-rechazo.page.scss'],
})
export class InscripcionMedicaRechazoPage implements OnInit {

  mensaje:string = '';
  codigoRetorno:number = 0;
  constructor(private activatedRoute: ActivatedRoute,
             private navCtrl: NavController) { }

  ngOnInit() {
    this.mensaje = this.activatedRoute.snapshot.params.mensaje;
    this.codigoRetorno = this.activatedRoute.snapshot.params.codigoRetorno;
  }

  abrirAdjuntarDocumento(){
    this.navCtrl.navigateRoot(`adjuntar-documento/${this.codigoRetorno}`);
  }
}
