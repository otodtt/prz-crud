import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubstancesComponent } from './substances.component';
import { AllSubsComponent } from './all-subs/all-subs.component';
import { AddSubsComponent } from './add-subs/add-subs.component';



export const routes: Routes = [
  { path: '', component: SubstancesComponent, children: [
    { path: '', redirectTo: 'all', pathMatch: 'full' },
    { path: 'all', component: AllSubsComponent },
    { path: 'add', component: AddSubsComponent },
  ]}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SubstancesRoutingModule { }
