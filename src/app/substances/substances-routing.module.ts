import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubstancesComponent } from './substances.component';
import { AllSubsComponent } from './all-subs/all-subs.component';
import { AddSubsComponent } from './add-subs/add-subs.component';
import { DetailSubstanceResolver } from './detail-subs/detail-substance.resolver';
import { DetailSubstanceComponent } from './detail-subs/detail-substance.component';



export const routes: Routes = [
  { path: '', component: SubstancesComponent, children: [
    { path: '', redirectTo: 'all', pathMatch: 'full' },
    { path: 'all', component: AllSubsComponent },
    { path: 'add', component: AddSubsComponent },
    { path: 'details/:id', component: DetailSubstanceComponent, resolve: { data : DetailSubstanceResolver} },
    { path: 'edit/:id', component: DetailSubstanceComponent, resolve: { data : DetailSubstanceResolver} },
    // { path: 'not-active', component: NotActiveComponent },
  ]}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SubstancesRoutingModule { }
