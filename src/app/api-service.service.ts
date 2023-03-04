import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import config from "../assets/tcup-config.json";

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  mapApiUrl : string = config.map_page?.api_url;
  plotApiUrl : string = config.plot_page?.api_url;
  dataApiUrl : string = config.data_page?.api_url;

  constructor(private http: HttpClient) { }

  public getMapData() : Observable<any> {
    return this.http.get<any>(`${this.mapApiUrl}`);
  }

  public getPlotData() : Observable<any> {
    return this.http.get<any>(`${this.plotApiUrl}`);
  }

  public getData() : Observable<any> {
    return this.http.get<any>(`${this.dataApiUrl}`);
  }
}
