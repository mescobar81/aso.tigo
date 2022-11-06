import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdjuntarDocumentoPageRoutingModule } from './adjuntar-documento-routing.module';

import { AdjuntarDocumentoPage } from './adjuntar-documento.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdjuntarDocumentoPageRoutingModule,
    ComponentsModule
  ],
  declarations: [AdjuntarDocumentoPage]
})
export class AdjuntarDocumentoPageModule {}
