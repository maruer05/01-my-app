import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagesPage } from './pages.page';

const routes: Routes = [
  {
    path: '',
    component: PagesPage
  },
  {
    path: 'cocina',
    loadChildren: () => import('./cocina/cocina.module').then( m => m.CocinaPageModule)
  },
  {
    path: 'habitacion',
    loadChildren: () => import('./habitacion/habitacion.module').then( m => m.HabitacionPageModule)
  },
  {
    path: 'garage',
    loadChildren: () => import('./garage/garage.module').then( m => m.GaragePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesPageRoutingModule {}
