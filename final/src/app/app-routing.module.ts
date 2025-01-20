import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login.component';
import { RegisterComponent } from './components/register.component';
import { AdminComponent } from './pages/admin.component';
import { HomeComponent } from './pages/home.component';
import { GuitarsComponent } from './pages/guitars.component';
import { AboutComponent } from './pages/about.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'guitars', component: GuitarsComponent },
  { path: 'about', component: AboutComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
