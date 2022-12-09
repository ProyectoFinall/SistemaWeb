import { Component } from '@angular/core';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationStart,
  Router,
} from '@angular/router';
import {
  NgxQrcodeElementTypes,
  NgxQrcodeErrorCorrectionLevels,
} from '@techiediaries/ngx-qrcode';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  displayLoading: boolean = false;
  title = 'CIV';
  elementType = NgxQrcodeElementTypes.URL;
  correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
  value = 'www.codeforiraq.org';
  constructor(private primengConfig: PrimeNGConfig, private router: Router) {
    this.router.events.subscribe((event: any) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.displayLoading = true;
          break;
        }
        case event instanceof NavigationCancel:
        case event instanceof NavigationEnd: {
          this.displayLoading = false;
          break;
        }
        default: {
          break;
        }
      }
    });
  }
}
