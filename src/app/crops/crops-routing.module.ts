import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CropsComponent } from './crops.component';
import { AllCropsComponent } from './all-crops/all-crops.component';
import { AddCropsComponent } from './add-crops/add-crops.component';



export const routes: Routes = [
  { path: '', component: CropsComponent, children: [
    { path: '', redirectTo: 'all', pathMatch: 'full' },
    { path: 'all', component: AllCropsComponent },
    { path: 'add', component: AddCropsComponent },
  ]}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CropsRoutingModule { }
