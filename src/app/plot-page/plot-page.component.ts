import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiServiceService } from '../api-service.service';


@Component({
  selector: 'app-plot-page',
  templateUrl: './plot-page.component.html',
  styleUrls: ['./plot-page.component.css']
})
export class PlotPageComponent {

  constructor( private apiService : ApiServiceService ) {}
  
  //Used attributes

  apiPlotData! : any;
  width : number = 900;
  height : number = 526;
  isLoading : boolean = false;
  isInsightLoading : boolean = false;
  showInsights : boolean = true;
  insightsData! : string;
  title : string = "Plot"; 
  plotType: string = 'scatter';
  modeType: string = 'lines';
  traceTypes : string[] = ['scatter', 'bar'];
  scatterModes : string[] = ['markers', 'lines', 'lines+markers'];

  //Axes data
  xAxisOptions! : string[];
  yAxisOptions! : string[];

  xAxisUserSelection! : string;
  yAxisUserSelection! : string;

  xAxisData! : number[] ;
  yAxisData! : number[] ;

  log = () : void => {
    console.log(this.plotType);
  }

  traceData : TraceData = {
    x: this.xAxisData,
    y: this.yAxisData,
    type: this.plotType,
    mode : this.modeType
  };
  
  trace2 : TraceData  = {
    x: [1, 2, 3, 4],
    y: [16, 5, 11, 9],
    type: 'scatter'
  };
  
  // data = [this.trace1, this.trace2];
  data = [this.traceData];
  
  layout = {
    width: this.width, 
    height: this.height, 
    title: this.title
  };

  setData() : void {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 3000);
  }

  getPlotData() : void {
    this.isLoading = true;
    this.apiService.getPlotData()
    .subscribe(plotData => {
      if (plotData.status == 200) {
        this.apiPlotData = plotData.data;
      }
    });
  }

  getInsights() : void {
    this.isInsightLoading = true;
    this.apiService.getInsights()
    .subscribe( insightData => {
      
    });
  }

  resetPlot() : void {
    this.xAxisData = [];
    this.yAxisData = [];
    this.title = "Plot";
  }

  closeInsights() : void {
    this.showInsights = false;
  }

}

export interface TraceData {
  x: number[];
  y: number[];
  type: string;
  mode?: string; 
}
