import { Component, OnInit } from '@angular/core';
import { Detalle } from 'src/app/interfaces/interface';

@Component({
  selector: 'app-ordenes-pendientes',
  templateUrl: './ordenes-pendientes.page.html',
  styleUrls: ['./ordenes-pendientes.page.scss'],
})
export class OrdenesPendientesPage implements OnInit {

  detalle:Detalle[] = [];
  constructor() { }

  ngOnInit() {
  }

}
