import { Component, HostListener, ViewChild } from '@angular/core';

import { ios } from 'application';
import { RouterExtensions } from 'nativescript-angular/router';
import { MapView, Marker, Polyline, Position } from 'nativescript-google-maps-sdk';
import { RadSideDrawerComponent, SideDrawerType } from 'nativescript-telerik-ui/sidedrawer/angular';
import { Page } from 'ui/page';
import { Color } from 'color';

import { AuthService } from '../../shared/providers/auth.service';
import { BackendService } from '../../shared/providers/backend.service';
import { GeolocationService } from '../../shared/providers/geolocation.service';
import { UserService } from '../../shared/providers/user.service';
var style = require('./map-style.json');


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
  user: any;

  @ViewChild(RadSideDrawerComponent) public drawerComponent: RadSideDrawerComponent;
  private drawer: SideDrawerType;

  constructor(private router: RouterExtensions,
              private page: Page,
              private authService: AuthService,
              private geolocationService: GeolocationService,
              private userService: UserService) {}

  ngOnInit() {
    if(ios) this.page.style.marginTop = -20;
    this.userService.get(BackendService.token).first().subscribe((data: any) => {
      this.user = data;
    });
  }

  ngAfterViewInit() {
    this.drawer = this.drawerComponent.sideDrawer;
  }

  openDrawer(){
    this.drawer.showDrawer();
  }

  closeDrawer(){
    this.drawer.closeDrawer();
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

    // this.gpsLine = this.addPointToLine({
    //   color: new Color('Green'),
    //   line: this.gpsLine,
    //   location: position,
    //   geodesic: true,
    //   width: 100
    // });
  };

  addPointToLine(args: AddLineArgs) {
    if (!this.mapView || !args || !args.location) return;

    let line = args.line;

    if (!line) {
      line = new Polyline();
      line.visible = true;
      line.width = args.width || 10;
      line.color = args.color || new Color('Red');
      line.geodesic = args.geodesic != undefined ? args.geodesic : true;
      this.mapView.addPolyline(line);
    }
    line.addPoint(Position.positionFromLatLng(args.location.latitude, args.location.longitude));

    return line;
  }

  addMarker(args: AddMarkerArgs) {
      if (!this.mapView || !args || !args.location) return;

      let marker = new Marker();
      marker.position = Position.positionFromLatLng(args.location.latitude, args.location.longitude);
      marker.title = args.title;
      marker.snippet = args.title;
      this.mapView.addMarker(marker);

      return marker;
  };

  mapTapped(event) {
    console.log('mapTapped');
    let marker: AddMarkerArgs = new AddMarkerArgs();
    marker.location = event.position;
    marker.title = 'HOME!';
    this.addMarker(marker);
  }

  navigateProfile() {
    this.router.navigate(['profile', BackendService.token]);
    this.closeDrawer();
  }
}
