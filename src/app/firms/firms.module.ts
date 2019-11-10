import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AngularFirestoreModule, FirestoreSettingsToken } from '@angular/fire/firestore';
import { FirebaseService } from '../services/firebase.service';
import { FirstLetterService } from '../services/first.letter.service';
import { FirmService } from './firm.service';

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
import { DetailFirmComponent } from './detail-firm/detail-firm.component';
import { DetailFirmResolver } from './detail-firm/detail-firm.resolver';
import { AddFirmsComponent } from './add-firms/add-firms.component';
import { EditFirmComponent } from './edit-firm/edit-firm.component';

@NgModule({
  declarations: [
    FirmsComponent,
    AllFirmsComponent,
    AddFirmsComponent,
    DetailFirmComponent,
    EditFirmComponent
  ],
  imports: [
    CommonModule,
    FirmsRoutingModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    FirebaseService,
    FirstLetterService,
    FirmService,
    { provide: FirestoreSettingsToken, useValue: {} }, DetailFirmResolver],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class FirmsModule { }
