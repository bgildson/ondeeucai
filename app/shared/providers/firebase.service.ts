import { NgZone } from '@angular/core';
import { Observable, Observer } from 'rxjs'
import * as firebase from 'nativescript-plugin-firebase';

export class FirebaseService<T> {
  private _path: string = '/users';

  constructor(private path: string, private ngZone: NgZone) { }

  query(options: firebase.QueryOptions): Observable<T> {
    return new Observable((observer: Observer<any>) => {
      let callback = (data: any) => {
        this.ngZone.run(() => {
          observer.next(data);
        });
      }
      firebase.query(callback, `${this._path}`, options);
    });
  }

  get(id?: string): Observable<any> {
    return new Observable((observer: Observer<T>) => {
      let callback = (data: any) => {
        this.ngZone.run(() => {
          observer.next(data);
        });
      }
      firebase.addValueEventListener(callback, id ? `${this._path}/${id}` : this._path);
    });
  }

  add(value): Promise<any> {
    return firebase.push(this._path, value);
  }

  update(id: string, value: any): Promise<T> {
    return firebase.update(`${this._path}/${id}`, value);
  }

  remove(id: string): Promise<T> {
    return firebase.remove(`${this._path}/${id}`);
  }
}
