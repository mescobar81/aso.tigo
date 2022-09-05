import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-mes-detalle',
  templateUrl: './mes-detalle.component.html',
  styleUrls: ['./mes-detalle.component.scss'],
})
export class MesDetalleComponent implements OnInit {

  @Input() 
  detalle:any[]  = [];
  constructor() { }

  ngOnInit() {
  }
}
