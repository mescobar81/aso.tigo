import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  constructor(private menuCtrl:MenuController) { }

  ngOnInit() {
    this.menuCtrl.enable(true, 'first');
    this.mostrarMenu();
  }

  mostrarMenu(){
    this.menuCtrl.open('first');
  }
}
