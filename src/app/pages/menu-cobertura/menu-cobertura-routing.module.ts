import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuCoberturaPage } from './menu-cobertura.page';

const routes: Routes = [
  {
    path: '',
    component: MenuCoberturaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuCoberturaPageRoutingModule {}
