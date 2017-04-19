import { Injectable } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';

import * as firebase from 'nativescript-plugin-firebase';

import { BackendService } from '../../shared/providers/backend.service';

@Injectable()
export class AuthService {

  constructor(private router: RouterExtensions) {}

  login(email: string, password: string): Promise<any> {
    return new Promise((resolve, reject) => {
      firebase.login({
        type: firebase.LoginType.PASSWORD,
        email: email,
        password: password
      }).then((result) => {
        BackendService.token = result.uid;
        this.router.navigate([''], { clearHistory: true });
        resolve(result);
      }).catch((err) => {
        reject(err);
      });
    });
  }

  logout(): Promise<any> {
    BackendService.token = '';
    this.router.navigate(['/login'], { clearHistory: true });
    return firebase.logout();
  }

}
