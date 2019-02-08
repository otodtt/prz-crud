import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MatButtonModule,
  MatInputModule,
  MatSliderModule,
  MatDialogModule,
  MatIconModule,
  MatListModule
} from '@angular/material';

import { SubstancesRoutingModule } from './substances-routing.module';
import { SubstancesComponent } from './substances.component';
import { AddSubsComponent } from './add-subs/add-subs.component';
import { AllSubsComponent } from './all-subs/all-subs.component';

@NgModule({
  declarations: [
    SubstancesComponent,
    AddSubsComponent,
    AllSubsComponent
  ],
  imports: [
    CommonModule,
    SubstancesRoutingModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class SubstancesModule { }
