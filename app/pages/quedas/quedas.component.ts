import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'quedas',
  templateUrl: 'quedas.component.html'
})
export class QuedasComponent {

  quedas: any[];

  ngOnInit() {
    this.quedas = [
      {
        "image": "res://icon-76",
        "position": {},
        "legenda": "Esse dia foi foda!"
      },
      {
        "image": "res://icon-76",
        "position": {},
        "legenda": "Esse dia foi foda!"
      }
    ];
  }

}
