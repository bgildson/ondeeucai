import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import * as firebase from 'nativescript-plugin-firebase';

@Injectable()
export class QuedasService {

  getByUser(uid: string): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      firebase.addValueEventListener((data: any) => observer.next(data), '/quedas');
    });
  }

}
