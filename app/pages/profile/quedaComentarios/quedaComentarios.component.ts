import { Component } from '@angular/core';
import { ModalDialogParams } from 'nativescript-angular/directives/dialogs';
import * as firebase from 'nativescript-plugin-firebase';

import { Comentario } from '../../../shared/models/comentario.model';
import { BackendService } from '../../../shared/providers/backend.service';
import { UserService } from '../../../shared/providers/user.service';
import { QuedaComentarioService } from '../../../shared/providers/quedaComentario.service';

@Component({
  moduleId: module.id,
  templateUrl: 'quedaComentarios.component.html',
  styleUrls: [ 'quedaComentarios.css' ]
})
export class QuedaComentariosComponent {
  comentario: string;
  comentarios: Comentario[] = new Array<Comentario>();
  salvandoComentario: boolean;

  constructor(private params: ModalDialogParams, 
              private userService: UserService,
              private quedaComentarioService: QuedaComentarioService) { }

  ngOnInit() {
    this.quedaComentarioService.query({ orderBy: { type: firebase.QueryOrderByType.KEY } }, { quedaId: this.params.context['quedaId'] }).subscribe((comentario: any) => {
      if(comentario.type == 'ChildAdded') {
        this.comentarios.push(comentario);
        return
      }
      let index: number;
      this.comentarios.forEach((data: any, i: number) => {
        if(data.key == comentario.key) {
          index = i;
          return
        }
      });
      if(comentario.type == 'ChildRemoved') {
        this.comentarios.splice(index, 0);
      }
      if(comentario.type == 'ChildChanged') {
        (<any>Object).assign(this.comentarios[index], comentario);
      }
    });
  }

  close() {
    this.params.closeCallback();
  }

  comentar() {
    this.salvandoComentario = true;
    this.userService.get({ id: BackendService.token }).subscribe((data: any) => {
      this.quedaComentarioService.add({ uid: data.key, user: data.value, conteudo: this.comentario }, { quedaId: this.params.context['quedaId'] }).then(() => {
        this.salvandoComentario = false;
        this.comentario = '';
      });
    });
  }
}
