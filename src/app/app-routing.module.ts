import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ValidarUsuarioGuard } from './guards/validar-usuario.guard';

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
    canLoad:[ValidarUsuarioGuard],
    canActivate:[ValidarUsuarioGuard]
  },
  
  {
    path: 'inicio/mes-abierto',
    loadChildren: () => import('./pages/mes-abierto/mes-abierto.module').then( m => m.MesAbiertoPageModule),
    canLoad:[ValidarUsuarioGuard],
    canActivate:[ValidarUsuarioGuard]
  },
  
  {
    path: 'inicio/mes-cerrado',
    loadChildren: () => import('./pages/mes-cerrado/mes-cerrado.module').then( m => m.MesCerradoPageModule),
    canLoad:[ValidarUsuarioGuard],
    canActivate:[ValidarUsuarioGuard]
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
