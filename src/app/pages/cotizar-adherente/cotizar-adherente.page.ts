import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Adherente, NuevoGrupoFamiliar } from 'src/app/interfaces/interface';
import { CoberturaMedicaService } from 'src/app/services/cobertura-medica.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-cotizar-adherente',
  templateUrl: './cotizar-adherente.page.html',
  styleUrls: ['./cotizar-adherente.page.scss'],
})
export class CotizarAdherentePage implements OnInit {
  titulo:String = "";
  cantidad:number = 0;
  beneficiarioAdherentes:NuevoGrupoFamiliar[] =  [];
  adherentes:Adherente[] = [];
  constructor(private coberturaMedicaSvr: CoberturaMedicaService,
    private storageService:StorageService) {
   }

  async ngOnInit() {
    const {Nomserv, codigo, Popcion, idplan, codsegmento, beneficio} = await this.storageService.getDatoBeneficiarioAdherente();
    this.titulo = Nomserv;
    this.beneficiarioAdherentes =  (await this.coberturaMedicaSvr.getNuevoGrupoFamiliar(codigo, codsegmento, idplan, beneficio, Popcion)).NuevoGrupoFamilia;
    this.adherentes =  (await this.coberturaMedicaSvr.obtenerAdherentes(idplan)).Adherente;
  }

  cotizar(fCotizar:NgForm){
    console.log(fCotizar);
    
  }

  incrementarValor(){
    this.cantidad++;
    console.log(this.cantidad);
    
  }

  decrementarValor(){
    if(this.cantidad <= 0){
      return;
    }
    this.cantidad--;
  }
}
