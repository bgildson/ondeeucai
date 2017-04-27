import { NgZone } from '@angular/core';
import { Observable, Observer } from 'rxjs'
import * as firebase from 'nativescript-plugin-firebase';

export class FirebaseService<M, P extends {id?}> {
  private _url: string;
  getUrl(params: P): string {
    return this.urlBuild(this._url, params);
  }

  constructor(url: string, private ngZone: NgZone) {
    this._url = url;
  }

  query(options: firebase.QueryOptions, params?: P): Observable<M> {
    return new Observable((observer: Observer<any>) => {
      let callback = (data: any) => {
        this.ngZone.run(() => {
          observer.next(data);
        });
      }
      let listeners;
      firebase.query(callback, this.getUrl(params), options).then((response: any) => listeners = response.listeners );
      return () => firebase.removeEventListeners(listeners, this._url);
    });
  }

  get(params?: P): Observable<any> {
    return new Observable((observer: Observer<M>) => {
      let callback = (data: any) => {
        this.ngZone.run(() => {
          observer.next(data);
        });
      }
      let listeners;
      firebase.addValueEventListener(callback, params && params.id ? this.urlBuild(`${this._url}/{id}`, params) : this.getUrl(params))
        .then((response: any) => listeners = response.listeners );
      return () => firebase.removeEventListeners(listeners, this.getUrl(params));
    });
  }

  add(value, params?: P): Promise<any> {
    return firebase.push(this.getUrl(params), value);
  }

  update(value: any, params?: P): Promise<M> {
    return firebase.update(this.urlBuild(`${this._url}/{id}`, params), value);
  }

  remove(params: P): Promise<M> {
    return firebase.remove(this.getUrl(params));
  }

  private urlBuild(text: string, opts: P) {
    return text.replace(/\{(\w+)\}/g, (match: string, expr: string) => {
      return opts[expr] || '';
    });
  }
}
