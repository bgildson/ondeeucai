import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptModule } from 'nativescript-angular/nativescript.module';
import { NativeScriptRouterModule } from 'nativescript-angular/router';

import { AuthGuard } from './shared/providers/authGuard.service';

const appRoutes: Routes = [
  { path: '', redirectTo: '/map', pathMatch: 'full' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginModule' },
  { path: 'map', loadChildren: './pages/map/map.module#MapModule', canActivate: [AuthGuard] },
  { path: 'profile', loadChildren: './pages/profile/profile.module#ProfileModule', canActivate: [AuthGuard] },
  { path: 'quedas', loadChildren: './pages/quedas/quedas.module#QuedasModule', canActivate: [AuthGuard] }
];

export const appRouting: ModuleWithProviders = NativeScriptRouterModule.forRoot(appRoutes);
