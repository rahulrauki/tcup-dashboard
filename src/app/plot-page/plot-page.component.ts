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

  apiPlotData : PlotData = {};
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
    x: [],
    y: [],
    type: this.plotType,
    mode : this.modeType
  };
  
  // data = [this.trace1, this.trace2];
  data = [this.traceData];
  
  layout = {
    width: this.width, 
    height: this.height, 
    title: this.title,
    xaxis: {
      title:{
        text: ""
      }
    },
    yaxis: {
      title:{
        text: ""
      }
    }
  };

  setData() : void {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 3000);
  }

  getPlotData() : void {
    this.isLoading = true;
    this.apiService.getPlotData(this.getMaxLen())
    .subscribe(plotData => {
      console.log(plotData);
      if (plotData.status == 200) {
        this.updatePlotData(plotData.data);
        this.fillOptionsDropdown();
      }
      this.isLoading = false;
    });
  }

  updatePlotData(plotData : PlotData) : void {
    //Checks for the first time and if the field is not there, and empty array is initialized
    for (const field in plotData) {
      if (!this.apiPlotData.hasOwnProperty(field)) {
        this.apiPlotData[field] = [];
      }
    }
    for (const field in plotData) {
      this.apiPlotData[field].push(...plotData[field]); // Adds new data into current list of data
      console.log(this.apiPlotData);
    }
  }

  getMaxLen() : number {
    let maxLen = 0, itrObj = this.apiPlotData;
    for (const field in itrObj) {
      const arr = itrObj[field];
      if (Array.isArray(arr)) {
        maxLen = Math.max(maxLen, arr.length);
      }
    }
    return maxLen;
  }

  fillOptionsDropdown() : void {
    const plotData = this.apiPlotData;
    let optionList: any[] = []
    for (const field in plotData) {
      optionList.push(field);
    }
    this.xAxisOptions = optionList;
    this.yAxisOptions = optionList;
    console.log(optionList);
  }

  fillXaxisData() : void {
    this.xAxisData = this.apiPlotData[this.xAxisUserSelection];
    console.log(this.xAxisData);
  }

  fillYaxisData() : void {
    this.yAxisData = this.apiPlotData[this.yAxisUserSelection];
    console.log(this.xAxisData);
  }

  getInsights() : void {
    this.isInsightLoading = true;
    let xData = [],  yData = [];
    if (this.xAxisData.length <= 20) xData = this.xAxisData;
    else xData = this.xAxisData.slice(this.xAxisData.length - 20 ,this.xAxisData.length) // Latest 20 items
    if (this.yAxisData.length <= 20) yData = this.yAxisData;
    else yData = this.yAxisData.slice(this.yAxisData.length - 20 ,this.yAxisData.length) // Latest 20 items
    let request : any = {};
    request[this.xAxisUserSelection] = xData;
    request[this.yAxisUserSelection] = yData;

    let requestData = {
      "data" : request
    };
    console.log(requestData);
    this.apiService.getInsights(requestData)
    .subscribe( insightData => {
      console.log(insightData);
      if (insightData.status == 200) {
        this.insightsData = insightData.data;
      } else {
        this.insightsData = "No Insights for given data";
      }
      console.log(this.insightsData);
      this.isInsightLoading = false;
    });
  }

  generatePlot() : void {
    this.traceData = {
      x: this.xAxisData,
      y: this.yAxisData,
      type: this.plotType,
      mode : this.modeType
    };

    let xAxisTitle = {
      title:{
        text : this.xAxisUserSelection
      }
    }
    let yAxisTitle = {
      title:{
        text : this.yAxisUserSelection
      }
    }

    this.layout = {
      width: this.width, 
      height: this.height, 
      title: `${this.xAxisUserSelection} vs ${this.yAxisUserSelection}`,
      xaxis: xAxisTitle,
      yaxis: yAxisTitle
    };

    this.data = [this.traceData];
  }

  resetPlot() : void {
    this.title = "Plot";

    this.traceData = {
      x: [],
      y: [],
      type: this.plotType,
      mode : this.modeType
    };

    let xAxisTitle = {
      title:{
        text : ""
      }
    }
    let yAxisTitle = {
      title:{
        text : ""
      }
    }

    this.layout = {
      width: this.width, 
      height: this.height, 
      title: this.title,
      xaxis: xAxisTitle,
      yaxis: yAxisTitle
    };

    this.data = [this.traceData];
  }

  clearInsights() : void {
    this.insightsData = "";
  }

}

// interface PlotData {
//   [key: string]: any[];
// }

type PlotData = Record<string, any[]>;

export interface TraceData {
  x: number[];
  y: number[];
  type: string;
  mode?: string; 
}
