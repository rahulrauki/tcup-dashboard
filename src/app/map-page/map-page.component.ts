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
  mapsParams : string = "origin=34.048612519412444, -118.2483486337169&destination=34.048612519412444, -118.2483486337169"; // setting default param to prevent error
  mapsEmbedUrl! : SafeResourceUrl;
  displayMap : boolean = false;
  isLoading : boolean = false;

  apiFetchData! : number[][];

  populateMapData() : void {
    // this.mapsParams = "origin=13.104712, 80.2713&destination=13.104712, 80.2713";
    this.mapsEmbedUrl =  this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.google.com/maps/embed/v1/${this.mapsMode}?key=${this.mapsApiKey}&${this.mapsParams}`);
    this.displayMap = true;
  }

  mapsParamConstructor() : void {
    let coOrds = this.apiFetchData;
    let originLat, originLong, destinationLat, destinationLong, waypoints, finalParam!:string;
    let resLen = coOrds.length, upperLimit;
    let waypointList = [];
    if (resLen < 20) upperLimit = resLen - 1; // Setting the limit of Waypoints as the max is 20 as per Embed API
    else upperLimit = 19; //As the last value must always be present as destination

    [originLat, originLong] = coOrds[0];
    [destinationLat, destinationLong] = coOrds[resLen - 1];

    let origin = `origin=${originLat},${originLong}`,
        destination = `destination=${destinationLat},${destinationLong}`;

    for (let i = 1; i < upperLimit; i++) {
      let lat, lon;
      [lat, lon] = coOrds[i];
      waypointList.push(`${lat},${lon}`);
    }
    if (waypointList.length > 0){
      waypoints = `waypoints=${waypointList.join('|')}`;
      finalParam = `${origin}&${destination}&${waypoints}`;
    } else {
      finalParam = `${origin}&${destination}`;
    }
    this.mapsParams = finalParam;
  }
 
  fetchLatestMap() : void {
      this.isLoading = true;
      this.apiService.getMapData()
      .subscribe( mapData => {
        if (mapData.status == 200) {
          this.apiFetchData = mapData.data; // [[lat, long], [lat, long] ... ]
          this.mapsParamConstructor();
          this.populateMapData()
          this.isLoading = false;
        }
      });
  }

  test(): void {
    this.isLoading = true;
    this.apiFetchData = CO_ORDS;
    this.mapsParamConstructor();
    this.populateMapData()
    this.isLoading = false;
  }


  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.populateMapData();
    
  }

}

const CO_ORDS : number[][] = [
  [13.085229349913153, 80.20291471563479],
  [13.084686262248875, 80.21788741103566],
  [13.075063469880297, 80.21846267832989],
  [13.06540793262874, 80.23432308746541],
  [13.05244331733924, 80.2408153088466],
  [13.045571232788165, 80.24092076620762],
  [13.079041078357966, 80.28200773838859],
  [13.074304031731767, 80.28592282539832]
]
