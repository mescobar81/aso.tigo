import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdjuntarDocumentoPage } from './adjuntar-documento.page';

const routes: Routes = [
  {
    path: '',
    component: AdjuntarDocumentoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdjuntarDocumentoPageRoutingModule {}
