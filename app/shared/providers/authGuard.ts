import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { RouterExtensions } from 'nativescript-angular/router';

import { BackendService } from './backend.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: RouterExtensions) { }

  canActivate() {
    if(BackendService.isLoggend()) {
      return true;
    } else {
      this.router.navigate(["/login"]);
      return false;
    }
  }

}
