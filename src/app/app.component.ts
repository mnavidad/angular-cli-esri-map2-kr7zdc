import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // Set our map properties
   mapCenter = [-122.6762071, 45.5234515];
  //basemapType = 'satellite';
  mapZoomLevel = 10;

  mapLoadedEvent(status: boolean) {
    console.log('The map has loaded: ' + status);
  }
}
