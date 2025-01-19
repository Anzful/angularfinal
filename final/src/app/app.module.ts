import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// Import your pages
import { HomeComponent } from './pages/home.component';
import { GuitarsComponent } from './pages/guitars.component';
import { AboutComponent } from './pages/about.component';
import { AdminComponent } from './pages/admin.component';
import { LoginComponent } from './components/login.component';
// Import your components
import { GuitarCardComponent } from './components/guitar-card.component';
// Services, Guards, etc.
import { AuthGuard } from './guards/auth.guard';

// (Optional) If you create a JWT interceptor
// import { JwtInterceptor } from './jwt.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    GuitarsComponent,
    AboutComponent,
    AdminComponent,
    GuitarCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    AuthGuard,
    // If you have an interceptor:
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: JwtInterceptor,
    //   multi: true
    // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
