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
    canLoad:[AuthGuard]
  },
  
  {
    path: 'inicio/mes-cerrado',
    loadChildren: () => import('./pages/mes-cerrado/mes-cerrado.module').then( m => m.MesCerradoPageModule),
    canLoad:[AuthGuard]
  },
  {
    path: 'inicio/movimiento-br',
    loadChildren: () => import('./pages/movimiento-br/movimiento-br.module').then( m => m.MovimientoBrPageModule),
    canLoad:[AuthGuard]
  },
  {
    path: 'inicio/solicitud-orden',
    loadChildren: () => import('./pages/solicitud-orden/solicitud-orden.module').then( m => m.SolicitudOrdenPageModule),
    canLoad:[AuthGuard]
  },
  {
    path: 'inicio/ordenes-pendientes',
    loadChildren: () => import('./pages/ordenes-pendientes/ordenes-pendientes.module').then( m => m.OrdenesPendientesPageModule),
    canLoad:[AuthGuard]
  },
  {
    path: 'inicio/orden-rechazada',
    loadChildren: () => import('./pages/orden-rechazada/orden-rechazada.module').then( m => m.OrdenRechazadaPageModule),
    canLoad:[AuthGuard]
  },
  {
    path: 'inicio/crea-ticket',
    loadChildren: () => import('./pages/crea-ticket/crea-ticket.module').then( m => m.CreaTicketPageModule),
    canLoad:[AuthGuard]
  },
  {
    path: 'cambiar-contrasenia',
    loadChildren: () => import('./pages/cambiar-contrasenia/cambiar-contrasenia.module').then( m => m.CambiarContraseniaPageModule),
    canLoad:[AuthGuard]
  },
  {
    path: 'inicio/aprobar-rechazar-orden',
    loadChildren: () => import('./pages/aprobar-rechazar-orden/aprobar-rechazar-orden.module').then( m => m.AprobarRechazarOrdenPageModule),
    canLoad:[AuthGuard]
  },
  {
    path: 'inicio/menu-cobertura',
    loadChildren: () => import('./pages/menu-cobertura/menu-cobertura.module').then( m => m.MenuCoberturaPageModule),
    canLoad:[AuthGuard]
  },
  {
    path: 'inicio/validar-beneficio/:beneficio',
    loadChildren: () => import('./pages/validar-beneficio/validar-beneficio.module').then( m => m.ValidarBeneficioPageModule),
    canLoad:[AuthGuard]
  },
  {
    path: 'inicio/cotizar-plan/:beneficio/:codigoRetorno',
    loadChildren: () => import('./pages/cotizar-plan/cotizar-plan.module').then( m => m.CotizarPlanPageModule),
    canLoad:[AuthGuard]
  },
  {
    path: 'adjuntar-documento/:codigoRetorno',
    loadChildren: () => import('./pages/adjuntar-documento/adjuntar-documento.module').then( m => m.AdjuntarDocumentoPageModule),
    canLoad:[AuthGuard]
  },
  {
    path: 'inscripcion-medica-rechazo/:mensaje/:codigoRetorno',
    loadChildren: () => import('./pages/inscripcion-medica-rechazo/inscripcion-medica-rechazo.module').then( m => m.InscripcionMedicaRechazoPageModule),
    canLoad:[AuthGuard]
  },
  {
    path: 'cotizar-adherente/:codigoRetorno',
    loadChildren: () => import('./pages/cotizar-adherente/cotizar-adherente.module').then( m => m.CotizarAdherentePageModule),
    canLoad:[AuthGuard]
  },
  {
    path: 'opcion-bajas',
    loadChildren: () => import('./pages/opcion-bajas/opcion-bajas.module').then( m => m.OpcionBajasPageModule),
    canLoad:[AuthGuard]
  },
  {
    path: 'opcion-baja-parcial',
    loadChildren: () => import('./pages/opcion-baja-parcial/opcion-baja-parcial.module').then( m => m.OpcionBajaParcialPageModule),
    canLoad:[AuthGuard]
  },
  {
    path: 'opcion-baja-total',
    loadChildren: () => import('./pages/opcion-baja-total/opcion-baja-total.module').then( m => m.OpcionBajaTotalPageModule),
    canLoad:[AuthGuard]
  },
  {
    path: 'inicio/tikets-abiertos',
    loadChildren: () => import('./pages/tikets-abiertos/tikets-abiertos.module').then( m => m.TiketsAbiertosPageModule)
  },  {
    path: 'responder-ticket',
    loadChildren: () => import('./pages/responder-ticket/responder-ticket.module').then( m => m.ResponderTicketPageModule)
  },
  {
    path: 'encuesta-ticket',
    loadChildren: () => import('./pages/encuesta-ticket/encuesta-ticket.module').then( m => m.EncuestaTicketPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
