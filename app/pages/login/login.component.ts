import { Component } from '@angular/core';

import { AuthService } from '../../shared/providers/auth.service';

@Component({
  moduleId: module.id,
  selector: 'login',
  templateUrl: 'login.component.html',
  styleUrls: [ 'login.component.css' ]
})
export class LoginComponent {

  email: string;
  password: string;
  isLoggingIn: boolean;

  constructor(private authService: AuthService) { }

  login() {
    this.isLoggingIn = true;
    this.authService.login(this.email, this.password)
      .then((res) => {
        this.isLoggingIn = false;
        console.log('LOGADO!');
      })
      .catch((err) => {
        this.isLoggingIn = false;
        console.log('ERRO NO LOGIN!');
      });
  }

  startBackgroundAnimation(background) {
    background.animate({
      scale: { x: 1.0, y: 1.0 },
      duration: 20000
    });
  }

}
