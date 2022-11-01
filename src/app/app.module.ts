import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home.component';
import { LoginComponent } from './components/login.component';
import { RegisterComponent } from './components/register.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthCookiesModule } from './auth-cookies/auth-cookies.module';
import { AuthService } from './services/auth.service';
import { AuthCookiesService } from './auth-cookies/auth-cookies.service';
import { AuthTokensModule } from './auth-tokens/auth-tokens.module';
import { AuthTokensService } from './auth-tokens/auth-tokens.service';

const tokensOrCookies: 'tokens' | 'cookies' = 'tokens';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    // @ts-ignore
    tokensOrCookies === 'cookies' ? AuthCookiesModule : AuthTokensModule
  ],
  providers: [
    {
      provide: AuthService,
      // @ts-ignore
      useExisting: tokensOrCookies === 'cookies' ? AuthCookiesService : AuthTokensService
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
