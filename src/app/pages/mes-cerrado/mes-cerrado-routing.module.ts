import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';

import { MesCerradoPage } from './mes-cerrado.page';

const routes: Routes = [
  {
    path: '',
    component: MesCerradoPage,
    canActivate:[AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MesCerradoPageRoutingModule {}
