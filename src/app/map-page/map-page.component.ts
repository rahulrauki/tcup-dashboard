import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import config from "../../assets/tcup-config.json";

@Component({
  selector: 'app-map-page',
  templateUrl: './map-page.component.html',
  styleUrls: ['./map-page.component.css']
})

export class MapPageComponent {

  constructor( public sanitizer: DomSanitizer ) {}

  mapsApiKey! : string;
  mapsMode! : string;
  mapsParams!: string;
  mapsEmbedUrl! : SafeResourceUrl;
  displayMap : boolean = false;

  populateMapData() : void {
    this.mapsApiKey = config.map_page.MAPS_API_KEY;
    this.mapsMode = config.map_page.MAP_MODE;
    this.mapsParams = "origin=13.08524048292034, 80.20243447444862&destination=12.991913825175219, 80.24711914337479";
    this.mapsEmbedUrl =  this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.google.com/maps/embed/v1/${this.mapsMode}?key=${this.mapsApiKey}&${this.mapsParams}`);
    this.displayMap = true;
  }


  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.populateMapData();
    
  }

}
