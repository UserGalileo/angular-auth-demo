import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RefreshTokenInterceptor } from './refresh-token.interceptor';

@NgModule({
  imports: [CommonModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RefreshTokenInterceptor,
      multi: true
    }
  ]
})
export class RefreshTokenModule {
  constructor(@Optional() @SkipSelf() self: RefreshTokenModule) {
    if (self) {
      throw new Error('RefreshTokenModule imported more than once.');
    }
  }
}
