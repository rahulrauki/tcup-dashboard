import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ApiServiceService } from "../api-service.service";

import config from "../../assets/tcup-config.json";

@Component({
  selector: 'app-map-page',
  templateUrl: './map-page.component.html',
  styleUrls: ['./map-page.component.css']
})

export class MapPageComponent implements OnInit {

  constructor( public sanitizer: DomSanitizer, private apiService : ApiServiceService ) {}

  mapsApiKey : string = config.map_page?.MAPS_API_KEY;;
  mapsMode : string = config.map_page?.MAP_MODE;;
  mapsParams!: string;
  mapsEmbedUrl! : SafeResourceUrl;
  displayMap : boolean = false;

  apiFetchData! : any;

  populateMapData() : void {
    // this.mapsParams = "origin=13.08524048292034, 80.20243447444862&destination=12.991913825175219, 80.24711914337479";
    this.mapsParams = "origin=13.08524048292034, 80.20243447444862&destination=13.08524048292034, 80.20243447444862";
    this.mapsEmbedUrl =  this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.google.com/maps/embed/v1/${this.mapsMode}?key=${this.mapsApiKey}&${this.mapsParams}`);
    this.displayMap = true;
  }

  fetchLatestMap() : void {
      this.apiService.getMapData()
      .subscribe( mapData => {
        if (mapData.status == 200) {
          this.apiFetchData = mapData.data;
          // Add code to update the map in the view
        }
      });

  }


  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.populateMapData();
    
  }

}
