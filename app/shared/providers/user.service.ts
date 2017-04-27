import { Injectable, NgZone } from '@angular/core';
import { Observable, Observer } from 'rxjs';

import * as firebase from 'nativescript-plugin-firebase';

import { FirebaseService } from './firebase.service';
import { User } from '../models/user.model';

@Injectable()
export class UserService extends FirebaseService<User, {id}> {

  constructor(ngZone: NgZone) {
    super('/users', ngZone);
  }

}
