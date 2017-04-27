import { Injectable, NgZone } from '@angular/core';
import { Observable, Observer } from 'rxjs';

import { FirebaseService } from './firebase.service';
import { Queda } from '../models/queda.model';

@Injectable()
export class QuedaSorrisoService extends FirebaseService<Queda, {quedaId, id}> {

  constructor(ngZone: NgZone) {
    super('/quedas/{quedaId}/sorrisos', ngZone);
  }

}
