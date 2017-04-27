import { NgModule, NgModuleFactoryLoader } from '@angular/core';
import { SIDEDRAWER_DIRECTIVES } from "nativescript-telerik-ui/sidedrawer/angular";
import { TNSFontIconModule, TNSFontIconPipe, TNSFontIconPurePipe } from 'nativescript-ngx-fonticon';

import { AuthGuard } from './providers/authGuard';
import { AuthService } from './providers/auth.service';
import { GeolocationService } from './providers/geolocation.service';
import { QuedaService } from './providers/queda.service';
import { QuedaSorrisoService } from './providers/quedaSorriso.service';
import { UserService } from './providers/user.service';

const SHARED_COMPONENTS = [
  SIDEDRAWER_DIRECTIVES
];

@NgModule({
  imports: [
    TNSFontIconModule.forRoot({
      'fa': 'fonts/font-awesome.css'
    }),
  ],
  providers: [
    AuthGuard,
    AuthService,
    GeolocationService,
    QuedaService,
    QuedaSorrisoService,
    UserService
  ],
  declarations: [
    ...SHARED_COMPONENTS
  ],
  exports: [
    TNSFontIconPipe,
    TNSFontIconPurePipe,
    ...SHARED_COMPONENTS
  ]
})
export class SharedModule { }
