import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
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

  public getMapData(availDataLen : number) : Observable<any> {
    let params = new HttpParams().set("index", availDataLen);
    return this.http.get<any>(`${this.mapApiUrl}`, { params });
  }

  public getPlotData(availDataLen : number) : Observable<any> {
    let params = new HttpParams().set("index", availDataLen);
    return this.http.get<any>(`${this.plotApiUrl}`, { params });
  }

  public getData(availDataLen : number) : Observable<any> {
    let params = new HttpParams().set("index", availDataLen);
    return this.http.get<any>(`${this.dataApiUrl}`, { params });
  }

  public getReport() : Observable<Blob> {
    return this.http.get(`${this.reportApiUrl}`, { responseType: 'blob' });
  }

  public getInsights(requestData : Object) : Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post<any>(`${this.insightsApiUrl}`, requestData, { headers });
  }
  
  public getExportData(availDataLen : number) : Observable<Blob> {
    let params = new HttpParams().set("index", availDataLen);
    return this.http.get(`${this.exportApiUrl}`, { params, responseType: 'blob' });
  }
}
