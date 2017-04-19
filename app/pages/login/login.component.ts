import { Component } from '@angular/core';
import { Page } from 'ui/page';
import { ios } from 'application';

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

  constructor(private authService: AuthService,
              private page: Page) { }

  ngOnInit() {
    if(ios) this.page.style.marginTop = -20;
  }

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
