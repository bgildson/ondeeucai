import { Injectable, NgZone } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import * as firebase from 'nativescript-plugin-firebase';

import { FirebaseService } from './firebase.service';
import { Comentario } from '../models/comentario.model';

@Injectable()
export class QuedaComentarioService extends FirebaseService<Comentario, {quedaId, id?}> {

  constructor(ngZone: NgZone) {
    super('/quedas/{quedaId}/comentarios', ngZone);
  }

}
