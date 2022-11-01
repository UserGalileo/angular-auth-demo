import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OAuthService } from '../oauth/oauth.service';

@Component({
  selector: 'app-oauth-callback',
  template: `
    Just a second...
  `,
})
export class OAuthCallbackComponent implements OnInit {

  constructor(
    private authService: OAuthService,
    private router: Router,
  ) { }

  /**
   * This page only gets shown after authentication (in the popup), never in Electron.
   * Soon after "completeAuthentication", this app gets closed.
   */
  ngOnInit(): void {
    this.authService.completeAuthentication().then(() => {
      this.router.navigateByUrl('/');
    });
  }
}
