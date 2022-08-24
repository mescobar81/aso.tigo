import { Component, Input, OnInit } from '@angular/core';
import { Detalle } from 'src/app/interfaces/interface';


@Component({
  selector: 'app-mes-detalle',
  templateUrl: './mes-detalle.component.html',
  styleUrls: ['./mes-detalle.component.scss'],
})
export class MesDetalleComponent implements OnInit {

  @Input() 
  detalle:Detalle[] = [];
  constructor() { }

  ngOnInit() {
  }
}
