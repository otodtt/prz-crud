import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';

// Required components for which route services to be activated
import { SignInComponent } from './auth/components/sign-in/sign-in.component';
import { SignUpComponent } from './auth/components/sign-up/sign-up.component';
import { DashboardComponent } from './auth/components/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './auth/components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './auth/components/verify-email/verify-email.component';

// Import canActivate guard services
import { AuthGuard } from './auth/shared/guard/auth.guard';
import { SecureInnerPagesGuard } from './auth/shared/guard/secure-inner-pages.guard';

import { HomeComponent } from './home/home.component';
import { NewUserComponent } from './new-user/new-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { EditUserResolver } from './edit-user/edit-user.resolver';

export const routes: Routes = [
  { path: '', redirectTo: '/sign-in', pathMatch: 'full'},
  { path: 'sign-in', component: SignInComponent, canActivate: [SecureInnerPagesGuard]},
  { path: 'register-user', component: SignUpComponent, canActivate: [SecureInnerPagesGuard]},
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'forgot-password', component: ForgotPasswordComponent, canActivate: [SecureInnerPagesGuard] },
  { path: 'verify-email-address', component: VerifyEmailComponent, canActivate: [SecureInnerPagesGuard] },
  // { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'new-user', component: NewUserComponent, canActivate: [AuthGuard] },
  { path: 'details/:id', component: EditUserComponent, resolve: { data: EditUserResolver }, canActivate: [AuthGuard] },
  { path: 'firms', loadChildren: './firms/firms.module#FirmsModule', canActivate: [AuthGuard]},
  { path: 'products', loadChildren: './products/products.module#ProductsModule', canActivate: [AuthGuard]},
  { path: 'crops', loadChildren: './crops/crops.module#CropsModule', canActivate: [AuthGuard]},
  { path: 'substances', loadChildren: './substances/substances.module#SubstancesModule', canActivate: [AuthGuard]},
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [RouterModule]
})

export class AppRoutingModul {}
