import { Injectable, NgZone } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import * as firebase from 'nativescript-plugin-firebase';

import { FirebaseService } from './firebase.service';
import { Queda } from '../models/queda.model';

@Injectable()
export class QuedaService extends FirebaseService<Queda, {id?}> {

  constructor(ngZone: NgZone) {
    super('/quedas', ngZone);
  }

  queryByUID(uid: string): Observable<any> {
    let options: firebase.QueryOptions = {
      orderBy: { type: firebase.QueryOrderByType.CHILD, value: 'uid' },
      range: { type: firebase.QueryRangeType.EQUAL_TO, value: uid }
    };
    return this.query(options);
  }

}
