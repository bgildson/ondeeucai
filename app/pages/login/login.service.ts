import { Injectable } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';

import * as firebase from 'nativescript-plugin-firebase';

import { BackendService } from '../../shared/providers/backend.service';

@Injectable()
export class LoginService {

  constructor(private backendService: BackendService, private router: RouterExtensions) {}

  login(email: string, password: string): Promise<any> {
    return new Promise((resolve, reject) => {
      firebase.login({
        type: firebase.LoginType.PASSWORD,
        email: email,
        password: password
      }).then((result) => {
        this.backendService.token = result.uid;
        this.router.navigate([''], { clearHistory: true });
        resolve(result);
      }).catch((err) => {
        reject(err);
      });
    });
  }

  logout(): Promise<any> {
    this.backendService.token = '';
    this.router.navigate(['/login']);
    return firebase.logout();
  }

}
