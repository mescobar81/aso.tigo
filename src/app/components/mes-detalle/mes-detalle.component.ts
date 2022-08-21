import { Component, Input, OnInit } from '@angular/core';
import { ResponseMesAbierto } from 'src/app/interfaces/interface';


@Component({
  selector: 'app-mes-detalle',
  templateUrl: './mes-detalle.component.html',
  styleUrls: ['./mes-detalle.component.scss'],
})
export class MesDetalleComponent implements OnInit {

  @Input() 
  extractoMes:ResponseMesAbierto;
  constructor() { }

  ngOnInit() {
  }
}
