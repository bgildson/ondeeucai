import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterExtensions } from 'nativescript-angular/router';
import { Observable, Subscription } from 'rxjs';
import * as firebase from 'nativescript-plugin-firebase';

import { UserService } from '../../shared/providers/user.service';
import { QuedaService } from '../../shared/providers/queda.service';
import { BackendService } from '../../shared/providers/backend.service';
import { User } from '../../shared/models/user.model';
import { Queda } from '../../shared/models/queda.model';

@Component({
  moduleId: module.id,
  templateUrl: 'profile.component.html',
  styleUrls: [ 'profile.css' ]
})
export class ProfileComponent {
  uid: string;
  user: User = new User();
  quedas: { key: string, value: Queda}[] = new Array<{ key: string, value: Queda}>();
  quedasSubscription: Subscription;

  constructor(private userService: UserService,
              private quedaService: QuedaService,
              private router: RouterExtensions,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.uid = this.route.snapshot.params['uid'];
    this.userService.get({id: this.uid}).first().subscribe((user: any) => { this.user = <User>user.value });
    this.quedasSubscription = this.quedaService.queryByUID(this.uid).subscribe((queda: any) => {
      if(queda.type == 'ChildAdded') {
        this.quedas.push(queda);
        return
      }
      let index: number;
      this.quedas.forEach((data: any, i: number) => {
        if(data.key == queda.key) {
          index = i;
          return
        }
      });
      if(queda.type == 'ChildRemoved') {
        this.quedas.splice(index, 0);
      }
      if(queda.type == 'ChildChanged') {
        (<any>Object).assign(this.quedas[index], queda);
      }
    });
  }

  ngOnDestroy() {
    this.quedasSubscription.unsubscribe();
  }

  isMyProfile() {
    return this.uid == BackendService.token;
  }

  editar() {
    // this.router.navigate(['./edit'], { relativeTo: this.route });
    this.router.navigate(['./', 'edit'], { relativeTo: this.route });
  }
}
