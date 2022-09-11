import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'inicio',
    loadChildren: () => import('./pages/inicio/inicio.module').then( m => m.InicioPageModule),
    canLoad:[AuthGuard]
  },
  
  {
    path: 'inicio/mes-abierto',
    loadChildren: () => import('./pages/mes-abierto/mes-abierto.module').then( m => m.MesAbiertoPageModule),
   
  },
  
  {
    path: 'inicio/mes-cerrado',
    loadChildren: () => import('./pages/mes-cerrado/mes-cerrado.module').then( m => m.MesCerradoPageModule),
  
  },
  {
    path: 'inicio/movimiento-br',
    loadChildren: () => import('./pages/movimiento-br/movimiento-br.module').then( m => m.MovimientoBrPageModule)
  },
  {
    path: 'inicio/solicitud-orden',
    loadChildren: () => import('./pages/solicitud-orden/solicitud-orden.module').then( m => m.SolicitudOrdenPageModule),
    canLoad:[AuthGuard]
  },
  {
    path: 'inicio/ordenes-pendientes',
    loadChildren: () => import('./pages/ordenes-pendientes/ordenes-pendientes.module').then( m => m.OrdenesPendientesPageModule)
  },
  {
    path: 'inicio/orden-rechazada',
    loadChildren: () => import('./pages/orden-rechazada/orden-rechazada.module').then( m => m.OrdenRechazadaPageModule)
  },
  {
    path: 'inicio/crea-ticket',
    loadChildren: () => import('./pages/crea-ticket/crea-ticket.module').then( m => m.CreaTicketPageModule)
  }






];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
