import { Component, OnInit } from '@angular/core';
import { ResponseMesAbierto } from 'src/app/interfaces/interface';

@Component({
  selector: 'app-mes-cerrado',
  templateUrl: './mes-cerrado.page.html',
  styleUrls: ['./mes-cerrado.page.scss'],
})
export class MesCerradoPage implements OnInit {

  extractoMes!:ResponseMesAbierto;
  constructor() { }

  ngOnInit() {
  }

}
