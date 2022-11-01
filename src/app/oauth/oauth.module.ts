import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OAuthService } from './oauth.service';

@NgModule({
  imports: [CommonModule]
})
export class OAuthModule {

  constructor(
    @Optional() @SkipSelf() self: OAuthModule,
    // Needed, don't remove
    private oauthService: OAuthService
  ) {
    if (self) {
      throw new Error('OAuthModule già importato')
    }
  }
}
