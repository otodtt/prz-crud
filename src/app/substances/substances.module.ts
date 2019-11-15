import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AngularFirestoreModule, FirestoreSettingsToken } from '@angular/fire/firestore';
import { FirebaseService } from '../services/firebase.service';
import { FirstLetterService } from '../services/first.letter.service';
import { SubstanceService } from './substance.service';

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
import { DetailSubstanceResolver } from './detail-subs/detail-substance.resolver';
import { DetailSubstanceComponent } from './detail-subs/detail-substance.component';

@NgModule({
  declarations: [
    SubstancesComponent,
    AddSubsComponent,
    AllSubsComponent,
    DetailSubstanceComponent
  ],
  imports: [
    CommonModule,
    SubstancesRoutingModule,
    MatButtonModule,
    MatIconModule
  ],
  providers: [
    FirebaseService,
    FirstLetterService,
    SubstanceService,
    { provide: FirestoreSettingsToken, useValue: {} }, DetailSubstanceResolver],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class SubstancesModule { }
