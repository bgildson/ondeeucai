import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptModule } from 'nativescript-angular/nativescript.module';
import { NativeScriptFormsModule } from 'nativescript-angular/forms';
import { NativeScriptRouterModule } from 'nativescript-angular/router';

import { LoginComponent } from './login.component';
import { AuthService } from '../../shared/providers/auth.service';

const routes: Routes = [
  { path: '', component: LoginComponent }
];

@NgModule({
  imports: [
    NativeScriptModule,
    NativeScriptFormsModule,
    NativeScriptRouterModule,
    NativeScriptRouterModule.forChild(routes)
  ],
  declarations: [ LoginComponent ],
  providers: [ AuthService ]
})
export class LoginModule { }
