import { Injectable } from '@angular/core';

import * as geolocation from 'nativescript-geolocation';
import { Position } from 'nativescript-google-maps-sdk';
import * as humanizeDistance from 'humanize-distance';


@Injectable()
export class GeolocationService {

  position: Position;

  getLocation() {
    return new Promise((resolve, reject) => {
      if(geolocation.isEnabled()) {
        resolve(this._getCurrentLocation());
      } else {
        geolocation.enableLocationRequest()
          .then(() => {
            resolve(this._getCurrentLocation());
          })
          .catch(error => {
            reject(error)
          });
      }
    });
  }

  getDistanceFrom(position: Position) {
    return humanizeDistance(position);
  }

  watchLocation(successCallback: any, errorCallback: any, options: geolocation.Options) {
    return geolocation.watchLocation(successCallback, errorCallback, options);
  }

  _getCurrentLocation(): Promise<any> {
    return new Promise((resolve, reject) => {
      geolocation.getCurrentLocation({ timeout: 20000 })
        .then((location) => {
          this.position = <Position>{ latitude: location.latitude, longitude: location.longitude };
          resolve(this.position);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

}