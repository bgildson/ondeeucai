import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterExtensions } from 'nativescript-angular/router';
import { Observable } from 'rxjs';

import { UserService } from '../../shared/providers/user.service';
import { BackendService } from '../../shared/providers/backend.service';

@Component({
  moduleId: module.id,
  templateUrl: 'profile.component.html',
  styles: [`
    .profile-image {
      width: 120px;
      height: 120px;
      border-radius: 5px;
      margin: 20;
    }
  `]
})
export class ProfileComponent {
  uid: string;
  user: any = {};
  isSaving: boolean;

  constructor(private userService: UserService,
              private router: RouterExtensions,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.uid = this.route.snapshot.params['uid'];
    this.userService.get(this.uid).first().subscribe((user: any) => { this.user = user.value });
  }

  save() {
    this.isSaving = true;
    this.userService.update(this.uid, this.user)
      .then(() => {
        this.isSaving = false;
      })
      .catch(() => {
        this.isSaving = false;
      });
  }
}
