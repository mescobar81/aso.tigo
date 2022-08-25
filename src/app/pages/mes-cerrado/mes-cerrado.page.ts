import { Component, OnInit } from '@angular/core';

import { Ciclo, Detalle, ResponseMesCerrado } from 'src/app/interfaces/interface';
import { ExtractoMesService } from 'src/app/services/extracto-mes.service';

@Component({
  selector: 'app-mes-cerrado',
  templateUrl: './mes-cerrado.page.html',
  styleUrls: ['./mes-cerrado.page.scss'],
})
export class MesCerradoPage implements OnInit {

  detalle:Detalle[] = [];
  mesCerrado!:ResponseMesCerrado;
  ciclos:Ciclo[] = [];
  constructor(private extractoSrv:ExtractoMesService) { }

  ngOnInit() {
    this.extractoSrv.getCiclosCerrados().subscribe(resp =>{
      this.ciclos = resp.ciclos;
    })
  }

  async seleccionarCiclo(event:any){
    this.detalle = [];
    const params = {
      mes:event.detail.value.mes,
      anho:event.detail.value.anho
    };
    console.log(params);
    
    await this.extractoSrv.getMesCerrado(params).then(mesCerrado =>{
      this.mesCerrado = mesCerrado;
      this.detalle = mesCerrado.detalle;
    });
  }

  /**
   * mapea los meses en letras para mostrar en el select
   * ver: de la api viene en numero
   * @param mes 
   * @returns 
   */
  getMesEnLetras(mes:number):string{
    switch(mes){
      case 1:
        return "Enero";
      case 2:
      return "Febrero";
      case 3:
      return "Marzo";
      case 4:
      return "Abril";
      case 5:
      return "Mayo";
      case 6:
      return "Junio";
      case 7:
      return "Julio";
      case 8:
      return "Agosto";
      case 9:
      return "Setiembre";
      case 10:
      return "Octubre";
      case 11:
      return "Noviembre";
      case 12:
      return "Diciembre";
      default:{
        console.log("Mes inválido");
        break;
      }
    }
  }
}
