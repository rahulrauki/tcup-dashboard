import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import config from "../assets/tcup-config.json";

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  private mapApiUrl : string = config.map_page?.api_url;
  private plotApiUrl : string = config.plot_page?.api_url;
  private dataApiUrl : string = config.data_page?.api_url;
  private reportApiUrl : string = config.data_page?.report_url;
  private insightsApiUrl : string = config.data_page?.insight_url;
  private exportApiUrl : string = config.data_page?.export_url;

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

  public getReport() : Observable<any> {
    return this.http.get<any>(`${this.reportApiUrl}`);
  }

  public getInsights() : Observable<any> {
    return this.http.get<any>(`${this.insightsApiUrl}`);
  }
  
  public getExportData() : Observable<any> {
    return this.http.get<any>(`${this.exportApiUrl}`);
  }
}
