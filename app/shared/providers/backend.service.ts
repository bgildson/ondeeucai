import { Injectable } from '@angular/core';
import { getString, setString } from 'application-settings';

@Injectable()
export class BackendService {
  public set token(token: string) {
    setString('token', token);
  }

  public get token(): string {
    return getString('token', '');
  }

  isLoggend() {
    return !!this.token;
  }
}
