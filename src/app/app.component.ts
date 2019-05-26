import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // Set our map properties
  mapCenter = [-97, 38];
  basemapType = 'satellite';
  mapZoomLevel = 12;

  mapLoadedEvent(status: boolean) {
    console.log('The map has loaded: ' + status);
  }
}
