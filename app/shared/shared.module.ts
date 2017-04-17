import { NgModule, NgModuleFactoryLoader } from '@angular/core';
import { SIDEDRAWER_DIRECTIVES } from "nativescript-telerik-ui/sidedrawer/angular";

import { AuthGuard } from './providers/authGuard.service';
import { BackendService } from './providers/backend.service';
import { GeolocationService } from './providers/geolocation.service';

const SHARED_COMPONENTS = [
  SIDEDRAWER_DIRECTIVES
];

@NgModule({
  imports: [],
  providers: [
    AuthGuard,
    BackendService,
    GeolocationService
  ],
  declarations: [
    ...SHARED_COMPONENTS
  ],
  exports: [
    ...SHARED_COMPONENTS
  ]
})
export class SharedModule { }
