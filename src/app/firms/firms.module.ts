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

import { FirmsRoutingModule } from './firms-routing.module';
import { FirmsComponent } from './firms.component';
import { AllFirmsComponent } from './all-firms/all-firms.component';
import { AddFirmsComponent } from './add-firms/add-firms.component';

@NgModule({
  declarations: [
    FirmsComponent,
    AllFirmsComponent,
    AddFirmsComponent
  ],
  imports: [
    CommonModule,
    FirmsRoutingModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class FirmsModule { }
