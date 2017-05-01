import { Component, Input, ViewContainerRef } from '@angular/core';
import { ModalDialogService, ModalDialogOptions } from 'nativescript-angular/directives/dialogs';
import { MapView } from 'nativescript-google-maps-sdk';
import * as moment from 'moment';

import { QuedaComentariosComponent } from '../quedaComentarios/quedaComentarios.component';
import { Queda } from '../../../shared/models/queda.model';
import { BackendService } from '../../../shared/providers/backend.service';
import { QuedaSorrisoService } from '../../../shared/providers/quedaSorriso.service';
var style = require('../../../shared/map-style.json');

@Component({
  moduleId: module.id,
  selector: 'queda-card',
  templateUrl: 'quedaCard.component.html',
  styleUrls: [ 'quedaCard.css' ]
})
export class QuedaCardComponent {
  mapView: MapView;
  mostrarComentarios: boolean;

  private _queda: { key: string, value: Queda };
  @Input()
  set queda(value: { key: string, value: Queda }) {
    this._queda = value;
    this.updatePosition();
  }
  get queda() {
    return this._queda;
  }

  constructor(private quedaSorrisoService: QuedaSorrisoService, 
              private modal: ModalDialogService, 
              private vcRef: ViewContainerRef) { }

  get uid() {
    return BackendService.token;
  }

  onMapReady(event) {
    if (this.mapView || !event.object) return;
    this.mapView = event.object;
    this.mapView.setStyle(style);
    this.updatePosition();
  }

  updatePosition() {
    if (!this._queda || !this.mapView) return;
    this.mapView.latitude = this._queda.value.latitude;
    this.mapView.longitude = this._queda.value.longitude;
    this.mapView.zoom = 16;
  }

  get sorriu(): boolean {
    return this.queda.value['sorrisos'] && 
           !!this.queda.value['sorrisos'][BackendService.token];
  }

  formatTimestamp(timestamp: number): string {
    return moment(timestamp).format('DD/MM/YYYY hh:mm');
  }

  toggleSorrir() {
    if(this.sorriu) {
      this.quedaSorrisoService.remove({ quedaId: this.queda.key, id: BackendService.token });
    } else {
      this.quedaSorrisoService.update({ sorriu: true }, { quedaId: this.queda.key, id: BackendService.token });
    }
  }

  sorrisosCount() {
    return this.queda.value['sorrisos'] ? Object.keys(this.queda.value['sorrisos']).length : 0;
  }

  comentariosCount() {
    return this.queda.value['comentarios'] ? Object.keys(this.queda.value['comentarios']).length : 0;
  }

  comentar() {
    let options: ModalDialogOptions = {
      context: { quedaId: this.queda.key },
      fullscreen: false,
      viewContainerRef: this.vcRef
    };
    this.modal.showModal(QuedaComentariosComponent, options);
  }
}
