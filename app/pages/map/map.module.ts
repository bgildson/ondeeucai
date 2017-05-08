import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptModule } from 'nativescript-angular/nativescript.module';
import { NativeScriptFormsModule } from 'nativescript-angular/forms';
import { NativeScriptRouterModule } from 'nativescript-angular/router';

import { SharedModule } from '../../shared';

import { MapComponent } from './map.component';
import { NovaQuedaComponent } from './novaQueda/novaQueda.component';

const routes: Routes = [
  { path: '', component: MapComponent }
];


@NgModule({
  imports: [
    NativeScriptModule,
    NativeScriptFormsModule,
    NativeScriptRouterModule,
    NativeScriptRouterModule.forChild(routes),
    SharedModule
  ],
  declarations: [
    MapComponent,
    NovaQuedaComponent
  ],
  entryComponents: [
    NovaQuedaComponent
  ]
})
export class MapModule {}
