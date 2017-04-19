import { NgModule, NgModuleFactoryLoader } from '@angular/core';
import { SIDEDRAWER_DIRECTIVES } from "nativescript-telerik-ui/sidedrawer/angular";

import { AuthGuard } from './providers/authGuard';
import { AuthService } from './providers/auth.service';
import { GeolocationService } from './providers/geolocation.service';
import { QuedasService } from './providers/quedas.service';
import { UserService } from './providers/user.service';

const SHARED_COMPONENTS = [
  SIDEDRAWER_DIRECTIVES
];

@NgModule({
  imports: [],
  providers: [
    AuthGuard,
    AuthService,
    GeolocationService,
    QuedasService,
    UserService
  ],
  declarations: [
    ...SHARED_COMPONENTS
  ],
  exports: [
    ...SHARED_COMPONENTS
  ]
})
export class SharedModule { }
