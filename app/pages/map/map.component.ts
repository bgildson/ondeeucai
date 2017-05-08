import { Component, HostListener, ViewChild, ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs';

import { ios } from 'application';
import { RouterExtensions } from 'nativescript-angular/router';
import { MapView, Marker, Polyline, Position } from 'nativescript-google-maps-sdk';
import { RadSideDrawerComponent, SideDrawerType } from 'nativescript-telerik-ui/sidedrawer/angular';
import { ModalDialogService, ModalDialogParams, ModalDialogOptions } from 'nativescript-angular/directives/dialogs';
import { Page } from 'ui/page';
import { Color } from 'color';

import { NovaQuedaComponent } from './novaQueda/novaQueda.component';
import { AuthService } from '../../shared/providers/auth.service';
import { BackendService } from '../../shared/providers/backend.service';
import { GeolocationService } from '../../shared/providers/geolocation.service';
import { UserService } from '../../shared/providers/user.service';
import { User } from '../../shared/models/user.model';
var style = require('../../shared/map-style.json');


export class AddMarkerArgs {
  public location: Position;
  public title: string;
}

export class AddLineArgs {
  public color: Color;
  public line: Polyline;
  public location: Position;
  public geodesic: boolean;
  public width: number;
}


@Component({
  moduleId: module.id,
  templateUrl: 'map.component.html',
  styleUrls: [ 'map.component.css' ]
})
export class MapComponent {

  mapView: MapView;
  watchId: any;
  gpsLine: Polyline;
  centeredOnLocation: boolean = false;
  user: { key: string, value: User}[] = new Array<{ key: string, value: User }>();
  user$: Subscription;
  adicionando: boolean;

  @ViewChild(RadSideDrawerComponent) public drawerComponent: RadSideDrawerComponent;
  private drawer: SideDrawerType;

  constructor(private router: RouterExtensions,
              private page: Page,
              private modal: ModalDialogService,
              private vcRef: ViewContainerRef,
              private authService: AuthService,
              private geolocationService: GeolocationService,
              private userService: UserService) {}

  ngOnInit() {
    if(ios) this.page.style.marginTop = -20;
    this.user$ = this.userService.get({id: BackendService.token}).first().subscribe((data: any) => {
      this.user = data;
    });
  }

  ngAfterViewInit() {
    this.drawer = this.drawerComponent.sideDrawer;
  }

  ngOnDestroy() {
    this.user$.unsubscribe();
  }

  openDrawer(){
    this.drawer.showDrawer();
  }

  closeDrawer(){
    this.drawer.closeDrawer();
  }

  toggleAdicionar() {
    this.adicionando = !this.adicionando;
  }

  //Map events
  onMapReady(event) {
    if (this.mapView || !event.object) return;

    this.mapView = event.object;

    this.mapView.setStyle(style);

    this.geolocationService.getLocation()
      .then((position: Position) => {
        this.watchId = this.geolocationService.watchLocation(this.locationReceived, (err) => { console.log(err) }, {
          desiredAccuracy: 10,
          updateDistance: 10,
          minimumUpdateTime: 10000,
          maximumAge: 60000
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  locationReceived = (position: Position) => {
    if (this.mapView && position && !this.centeredOnLocation) {
      this.mapView.latitude = position.latitude;
      this.mapView.longitude = position.longitude;
      this.mapView.zoom = 16;
      this.centeredOnLocation = true;
    }
  };

  mapTapped(event) {
    if(!this.adicionando) return

    let options: ModalDialogOptions = {
      context: event.position,
      fullscreen: true,
      viewContainerRef: this.vcRef
    };
    this.modal.showModal(NovaQuedaComponent, options).then((event) => {
      console.log('adicionou o comentario');
      this.adicionando = false;
    });
  }

  navigateProfile() {
    this.router.navigate(['profile', BackendService.token]);
    this.closeDrawer();
  }
}
