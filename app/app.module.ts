import { NgModule, NgModuleFactoryLoader, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { registerElement } from 'nativescript-angular/element-registry';
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { MapView } from 'nativescript-google-maps-sdk';

import { AppComponent } from "./app.component";
import { AppModuleFactoryLoader } from './appModuleFactoryLoader.service';
import { appRouting } from './app.routing';
import { SharedModule } from './shared';

import firebase = require("nativescript-plugin-firebase");

firebase.init({
  // Optionally pass in properties for database, authentication and cloud messaging,
  // see their respective docs.
}).then(
  (instance) => {
    console.log("firebase.init done");
  },
  (error) => {
    console.log("firebase.init error: " + error);
  }
);

console.log('Registering MapView');
registerElement('MapView', () => MapView);


@NgModule({
  imports: [
    NativeScriptModule,
    NativeScriptFormsModule,
    NativeScriptRouterModule,
    appRouting,
    SharedModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    { provide: NgModuleFactoryLoader, useClass: AppModuleFactoryLoader }
  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ],
  bootstrap: [
    AppComponent
  ],
})
export class AppModule { }
