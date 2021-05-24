import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HabitacionPageRoutingModule } from './habitacion-routing.module';

import { HabitacionPage } from './habitacion.page';

import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HabitacionPageRoutingModule,
    ComponentsModule
  ],
  declarations: [HabitacionPage]
})
export class HabitacionPageModule {}
