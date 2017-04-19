import { Injectable, NgZone } from '@angular/core';
import { Observable, Observer } from 'rxjs';

import { FirebaseService } from './firebase.service';
import { Queda } from '../models/queda.model';

@Injectable()
export class QuedasService extends FirebaseService<Queda> {

  constructor(ngZone: NgZone) {
    super('/quedas', ngZone);
  }

}
