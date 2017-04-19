import { Injectable } from '@angular/core';
import { getString, setString } from 'application-settings';

export class BackendService {
  public static set token(token: string) {
    setString('token', token);
  }

  public static get token(): string {
    return getString('token', '');
  }

  public static isLoggend() {
    return !!this.token;
  }
}
