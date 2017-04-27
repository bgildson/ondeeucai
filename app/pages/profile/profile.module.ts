import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptModule } from 'nativescript-angular/nativescript.module';
import { NativeScriptFormsModule } from 'nativescript-angular/forms';
import { NativeScriptRouterModule } from 'nativescript-angular/router';

import { ProfileComponent } from './profile.component';
import { ProfileEditComponent } from './profileEdit/profileEdit.component';
import { CardQuedaComponent } from './cardQueda/cardQueda.component';
import { SharedModule } from '../../shared/shared.module';

const routes: Routes = [
  { path: ':uid', component: ProfileComponent },
  { path: ':uid/edit', component: ProfileEditComponent }
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
    ProfileComponent,
    ProfileEditComponent,
    CardQuedaComponent
  ]
})
export class ProfileModule {}
