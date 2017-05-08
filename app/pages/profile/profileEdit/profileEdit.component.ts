import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterExtensions } from 'nativescript-angular/router';
import { Observable } from 'rxjs';

import { UserService } from '../../../shared/providers/user.service';
import { BackendService } from '../../../shared/providers/backend.service';

@Component({
  moduleId: module.id,
  templateUrl: 'profileEdit.component.html',
  styles: [`
    .profile-image {
      width: 120px;
      height: 120px;
      border-radius: 5px;
      margin: 20;
    }
  `]
})
export class ProfileEditComponent {
  uid: string;
  user: any = {};
  isSaving: boolean;
  username: string;

  constructor(private userService: UserService,
              private router: RouterExtensions,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.uid = this.route.snapshot.params['uid'];
    this.userService.get({id: this.uid}).first().subscribe((user: any) => {
      this.user = user.value;
      this.username = this.user.username;
    });
  }

  save() {
    this.isSaving = true;
    this.userService.update(this.uid, this.user)
      .then((data) => {
        console.log(data);
        this.username = this.user.username;
        this.isSaving = false;
      })
      .catch(() => {
        this.isSaving = false;
      });
  }
}
