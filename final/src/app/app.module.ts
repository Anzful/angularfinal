import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms'; // <-- Import from @angular/forms
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './jwt.interceptor';


import { AppComponent } from './app.component';

// Import your pages
import { HomeComponent } from './pages/home.component';
import { GuitarsComponent } from './pages/guitars.component';
import { AboutComponent } from './pages/about.component';
import { AdminComponent } from './pages/admin.component';
import { LoginComponent } from './components/login.component'; // <-- The login component

// Import your components
import { GuitarCardComponent } from './components/guitar-card.component';

// Services, Guards, etc.
import { AuthGuard } from './guards/auth.guard';
import { RegisterComponent } from './components/register.component';
// import { JwtInterceptor } from './jwt.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    GuitarsComponent,
    AboutComponent,
    AdminComponent,
    GuitarCardComponent,
    LoginComponent,
    RegisterComponent            // <-- Must add here
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,      // <-- Must be in imports to enable [formGroup]
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    AuthGuard,
    {
       provide: HTTP_INTERCEPTORS,
       useClass: JwtInterceptor,
       multi: true
     }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
