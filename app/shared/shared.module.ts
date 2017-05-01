import { NgModule, NgModuleFactoryLoader } from '@angular/core';
import { SIDEDRAWER_DIRECTIVES } from "nativescript-telerik-ui/sidedrawer/angular";
import { TNSFontIconModule, TNSFontIconPipe, TNSFontIconPurePipe } from 'nativescript-ngx-fonticon';

import { AuthGuard } from './providers/authGuard';
import { AuthService } from './providers/auth.service';
import { GeolocationService } from './providers/geolocation.service';
import { QuedaComentarioService } from './providers/quedaComentario.service';
import { QuedaService } from './providers/queda.service';
import { QuedaSorrisoService } from './providers/quedaSorriso.service';
import { UserService } from './providers/user.service';
import { TimestampToDatePipe } from './pipes/timestampToDate.pipe';

const SHARED_COMPONENTS = [
  SIDEDRAWER_DIRECTIVES
];

const SHARED_PIPES = [
  TimestampToDatePipe
]

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
    QuedaComentarioService,
    QuedaService,
    QuedaSorrisoService,
    UserService
  ],
  declarations: [
    ...SHARED_COMPONENTS,
    ...SHARED_PIPES
  ],
  exports: [
    TNSFontIconPipe,
    TNSFontIconPurePipe,
    ...SHARED_COMPONENTS,
    ...SHARED_PIPES
  ]
})
export class SharedModule { }
