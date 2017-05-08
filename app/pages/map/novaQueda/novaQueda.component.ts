import { Component } from '@angular/core';
import { ModalDialogParams } from 'nativescript-angular/directives/dialogs';

import { BackendService } from '../../../shared/providers/backend.service';
import { Queda } from '../../../shared/models/queda.model';
import { QuedaService } from '../../../shared/providers/queda.service';

@Component({
  moduleId: module.id,
  templateUrl: 'novaQueda.component.html',
  styleUrls: [ 'novaQueda.css' ]
})
export class NovaQuedaComponent {
  private queda: Queda = new Queda();
  private adicionando: boolean;

  constructor(private params: ModalDialogParams, 
              private quedaService: QuedaService) { }

  adicionar() {
    this.adicionando = true;
    this.queda.timestamp = new Date().getTime();
    this.queda.longitude = this.params.context['longitude'];
    this.queda.latitude = this.params.context['latitude'];
    this.queda.uid = BackendService.token;
    this.quedaService.add(this.queda).then(() => this.fechar() );
  }

  fechar() {
    this.params.closeCallback();
  }

}
