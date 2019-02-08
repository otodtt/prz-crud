import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';

import { HomeComponent } from './home/home.component';
import { NewUserComponent } from './new-user/new-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { EditUserResolver } from './edit-user/edit-user.resolver';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'new-user', component: NewUserComponent },
  { path: 'details/:id', component: EditUserComponent, resolve: { data : EditUserResolver} },
  { path: 'firms', loadChildren: './firms/firms.module#FirmsModule'},
  { path: 'products', loadChildren: './products/products.module#ProductsModule'},
  { path: 'crops', loadChildren: './crops/crops.module#CropsModule'},
  { path: 'substsnces', loadChildren: './substances/substances.module#SubstancesModule'},
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [RouterModule]
})

export class AppRoutingModul {}
