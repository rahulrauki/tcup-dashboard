import { Component } from '@angular/core';


@Component({
  selector: 'app-plot-page',
  templateUrl: './plot-page.component.html',
  styleUrls: ['./plot-page.component.css']
})
export class PlotPageComponent {
  
  //Used attributes
  

  trace1 = {
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
  
  layout = {width: 320, height: 240, title: 'A Fancy Plot'}
}
