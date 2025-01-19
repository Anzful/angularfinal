import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home.component';
import { GuitarsComponent } from './pages/guitars.component';
import { AboutComponent } from './pages/about.component';
import { AdminComponent } from './pages/admin.component';
import { LoginComponent } from './components/login.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'guitars', component: GuitarsComponent },
  { path: 'about', component: AboutComponent },
  { path: 'login', component: LoginComponent },
  // only allow if user is logged in + role=admin
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
