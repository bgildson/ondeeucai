import { Component } from '@angular/core';

import { LoginService } from './login.service';

@Component({
  moduleId: module.id,
  selector: 'login',
  templateUrl: 'login.component.html',
  styles: [
    `
      .b-color-b {
        background-color: #FFF;
      }
    `
  ]
})
export class LoginComponent {

  email: string;
  password: string;
  isLoggingIn: boolean;

  constructor(private loginService: LoginService) { }

  login() {
    this.isLoggingIn = true;
    this.loginService.login(this.email, this.password)
      .then((res) => {
        this.isLoggingIn = false;
        console.log('LOGADO!');
      })
      .catch((err) => {
        this.isLoggingIn = false;
        console.log('ERRO NO LOGIN!');
      });
  }

}
