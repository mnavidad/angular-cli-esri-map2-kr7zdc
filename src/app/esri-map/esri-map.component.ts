/*
  Copyright 2018 Esri
  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at
    http://www.apache.org/licenses/LICENSE-2.0
  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/

import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { loadModules } from 'esri-loader';
import esri = __esri;

@Component({
  selector: 'app-esri-map',
  templateUrl: './esri-map.component.html',
  styleUrls: ['./esri-map.component.css']
})
export class EsriMapComponent implements OnInit {

  @Output() mapLoaded = new EventEmitter<boolean>();
  @ViewChild('mapViewNode') private mapViewEl: ElementRef;

  /**
   * @private _zoom sets map zoom
   * @private _center sets map center
   * @private _basemap sets type of map
   */
  private _zoom: number = 5;
  private _center: Array<number> = [-97, 38];
  private _portalItem: Object = "8e42e164d4174da09f61fe0d3f206641";
 // private _basemap: string = "gray";

  @Input()
  set zoom(zoom: number) {
    this._zoom = zoom;
  }

  get zoom(): number {
    return this._zoom;
  }

  @Input()
  set center(center: Array<number>) {
    this._center = center;
  }

  get center(): Array<number> {
    return this._center;
  }

  // @Input()
   set portalItem(portalItem: Object) {
     this._portalItem = portalItem;
   }

   get portalItem(): Object {
     return this._portalItem;
   }

   // @Input()
  //  set basemap(basemap: string) {
  //    this._basemap = basemap;
  //  }

  //  get basemap(): string {
  //    return this._basemap;
  //  }


  constructor() { }

  async initializeMap() {
    try {
      const [EsriMap, EsriMapView, PortalItem] = await loadModules([
        'esri/WeMap',
        'esri/views/MapView',
        'esri/portal/PortalItem'
      ]);
      const portalItem = new PortalItem({
        id:"8e42e164d4174da09f61fe0d3f206641"
      }) 
      // Set type of map
      const mapProperties: esri.WebMapProperties = {
         portalItem: this._portalItem
      };

      const map: esri.WebMap = new EsriMap(mapProperties);

      // Set type of map view
      const mapViewProperties: esri.MapViewProperties = {
        container: this.mapViewEl.nativeElement,
        center: this._center,
        zoom: this._zoom,
        map: map
      };

      const mapView: esri.MapView = new EsriMapView(mapViewProperties);

      // All resources in the MapView and the map have loaded.
      // Now execute additional processes
      mapView.when(() => {
        this.mapLoaded.emit(true);
      });
    } catch (error) {
      alert('We have an error: ' + error);
    }

  }

  ngOnInit() {
    this.initializeMap();
  }

}
