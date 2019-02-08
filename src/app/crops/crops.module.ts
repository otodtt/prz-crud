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

import { CropsRoutingModule } from './crops-routing.module';
import { CropsComponent } from './crops.component';
import { AllCropsComponent } from './all-crops/all-crops.component';
import { AddCropsComponent } from './add-crops/add-crops.component';




@NgModule({
  declarations: [
    CropsComponent,
    AllCropsComponent,
    AddCropsComponent,
  ],
  imports: [
    CommonModule,
    CropsRoutingModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class CropsModule { }
