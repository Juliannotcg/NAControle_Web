import { ElementRef, NgZone, OnInit, ViewChild, Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MapsAPILoader } from '@agm/core';
import { MouseEvent } from '@agm/core';

@Component({
    selector     : 'map',
    templateUrl  : './map.component.html',
    styleUrls    : ['./map.component.scss'],
  })

export class AppComponent implements OnInit {

  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;

  @ViewChild("search")
  public searchElementRef: ElementRef;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) {}

  ngOnInit() {
    //set google maps defaults
    this.zoom = 4;
    this.latitude = 39.8282;
    this.longitude = -98.5795;

    //create search FormControl
    this.searchControl = new FormControl();

   
    //set current position
    this.setCurrentPosition();

    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;
        });
      });
    });
  }

  mapClicked($event: MouseEvent) {
    this.markers.push({
    latitude: $event.coords.lat,
    longitude: $event.coords.lng,
    draggable: true,
    iconUrl: './favicon.ico'
    });
  }

  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;
      });
    }
  }

  markers: marker[] = [
    {
        latitude: 51.673858,
        longitude: 7.815982,
        label: 'A',
        draggable: true,
        iconUrl: './favicon.ico'
    },
    {
        latitude: 51.373858,
        longitude: 7.215982,
        label: 'B',
        draggable: false,
        iconUrl: './favicon.ico'
    },
    {
        latitude: 51.723858,
        longitude: 7.895982,
        label: 'C',
        draggable: true,
        iconUrl: './favicon.ico'
    }
]}

interface marker {
	latitude: number;
	longitude: number;
	label?: string;
    draggable: boolean;
    iconUrl: string;
}