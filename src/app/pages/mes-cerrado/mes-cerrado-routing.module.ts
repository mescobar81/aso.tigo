import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MesCerradoPage } from './mes-cerrado.page';

const routes: Routes = [
  {
    path: '',
    component: MesCerradoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MesCerradoPageRoutingModule {}
