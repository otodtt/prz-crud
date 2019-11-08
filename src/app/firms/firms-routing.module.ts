import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FirmsComponent } from './firms.component';
import { AllFirmsComponent } from './all-firms/all-firms.component';
import { AddFirmsComponent } from './add-firms/add-firms.component';
import { DetailFirmComponent } from './detail-firm/detail-firm.component';
import { DetailFirmResolver } from './detail-firm/detail-firm.resolver';
import { EditFirmComponent } from './edit-firm/edit-firm.component';



export const routes: Routes = [
  { path: '', component: FirmsComponent, children: [
    { path: '', redirectTo: 'all', pathMatch: 'full' },
    { path: 'all', component: AllFirmsComponent },
    { path: 'details/:id', component: DetailFirmComponent, resolve: { data : DetailFirmResolver} },
    { path: 'edit/:id', component: EditFirmComponent, resolve: { data : DetailFirmResolver} },
    { path: 'add', component: AddFirmsComponent },
  ]}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FirmsRoutingModule { }
