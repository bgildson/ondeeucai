import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptModule } from 'nativescript-angular/nativescript.module';
import { NativeScriptRouterModule } from 'nativescript-angular/router';

import { SharedModule } from '../../shared';

import { MapComponent } from './map.component';

const routes: Routes = [
  { path: '', component: MapComponent }
];


@NgModule({
  imports: [
    NativeScriptModule,
    NativeScriptRouterModule,
    NativeScriptRouterModule.forChild(routes),
    SharedModule
  ],
  declarations: [ MapComponent ]
})
export class MapModule {}
