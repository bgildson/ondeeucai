import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';

import { AuthGuard } from './shared/providers/authGuard';

export const appRoutes: Routes = [
  { path: '', redirectTo: '/map', pathMatch: 'full' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginModule' },
  { path: 'map', loadChildren: './pages/map/map.module#MapModule', canActivate: [AuthGuard] },
  { path: 'profile', loadChildren: './pages/profile/profile.module#ProfileModule', canActivate: [AuthGuard] }
];
