import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { VerifyEmailComponent } from './pages/verify-email/verify-email.component';
import { StudentListComponent } from './usertype/student-list/student-list.component';
import { SchooluserComponent } from './usertype/schooluser/schooluser.component';
import { NgoHomePageComponent } from './usertype/ngo-home-page/ngo-home-page.component';
import { AuthGuard } from './shared/guard/auth.guard';




const routes: Routes = [
  { path: '', component:DashboardComponent, pathMatch:'full'},
  {path: 'login', component:LoginComponent, pathMatch:'full'},
  {path: 'register', component: RegisterComponent, pathMatch:'full'},
  {path: 'schooluser', component:SchooluserComponent, canActivate:[AuthGuard]},
  {path: 'student-list', component:StudentListComponent, pathMatch:'full', canActivate:[AuthGuard]},
  {path: 'forgot-password', component:ForgotPasswordComponent, pathMatch:'full',},
  {path: 'verify-email', component:VerifyEmailComponent, pathMatch:'full'},
  {path: 'ngouser', component:NgoHomePageComponent, canActivate:[AuthGuard]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
