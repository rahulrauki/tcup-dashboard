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
  plotType: string = 'scatter';
  modeType: string = 'lines';
  traceTypes : string[] = ['scatter', 'bar'];
  scatterModes : string[] = ['markers', 'lines', 'lines+markers'];

  log = () : void => {
    console.log(this.plotType);
  }

  trace1 : TraceData = {
    x: [1, 2, 3, 4],
    y: [10, 15, 13, 17],
    type: 'scatter'
  };
  
  trace2 = {
    x: [1, 2, 3, 4],
    y: [16, 5, 11, 9],
    type: 'scatter'
  };
  
  data = [this.trace1, this.trace2];
  
  layout = {width: 900, height: 526, title: 'A Fancy Plot'}

  getPlotData() : void {
    this.apiService.getPlotData()
    .subscribe(plotData => {
      if (plotData.status == 200) {
        this.apiPlotData = plotData.data;
      }
    });
  }
}

interface TraceData {
  x: number[];
  y: number[];
  type: string;
  mode?: string; 
}
