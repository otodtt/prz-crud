import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FirmsComponent } from './firms.component';
import { AllFirmsComponent } from './all-firms/all-firms.component';
import { AddFirmsComponent } from './add-firms/add-firms.component';



export const routes: Routes = [
  { path: '', component: FirmsComponent, children: [
    { path: '', redirectTo: 'all', pathMatch: 'full' },
    { path: 'all', component: AllFirmsComponent },
    { path: 'add', component: AddFirmsComponent },
  ]}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FirmsRoutingModule { }
