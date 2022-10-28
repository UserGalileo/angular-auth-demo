import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>
  `,
  styles: [`
    :host {
      display: block;
      background: rgba(0,0,0,.1);
      max-width: 400px;
      padding: 2em;
    }
  `]
})
export class AppComponent {
}
