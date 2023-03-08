import { Component } from '@angular/core';
import { ApiServiceService } from '../api-service.service'

@Component({
  selector: 'app-add-process',
  templateUrl: './add-process.component.html',
  styleUrls: ['./add-process.component.css']
})
export class AddProcessComponent {

  constructor(private apiService: ApiServiceService) {}

  fetchData : PlotData = {}
  variableOptions : string[] = [] ;
  selectedVariable! : string;
  equationString : string = "";
  newVariableName! : string ;
  isLoading : boolean  =  false;
  isSubmitLoading : boolean  =  false;
  showNotification : boolean = false;
  isSuccess : boolean = false;
  notification : string = "";



  addVaribleToEquation() : void {
    this.equationString += this.selectedVariable;
  }
  addPlus() :void {
    this.equationString += "+";
  }
  addMinus() :void {
    this.equationString += "-";
  }
  addMultiply() :void {
    this.equationString += "*";
  }
  addDivide() :void {
    this.equationString += "/";
  }
  addPow() :void {
    this.equationString += "**";
  }
  addLeftParanthesis() :void { 
    this.equationString += "(";
  }
  addRightParanthesis() :void {
    this.equationString += ")";
  }
  clearEquation() : void {
    this.equationString = "";
  }

  fetchNewData() : void {
    this.isLoading = true;
    this.apiService.getPlotData()
    .subscribe(fetchdata => {
      if (fetchdata.status == 200) {
        this.fetchData = fetchdata.data;
        this.populateOptions();
      }
      this.isLoading = false;
    });
  }

  populateOptions() : void {
    let options = [];
    for (const field in this.fetchData) {
      options.push(field);
    }
    this.variableOptions = options;
  }

  test() : void {
    this.fetchData = {
      "name" : [],
      "age" : [],
      "height" : [],
      "popu" : [],
      "hadsf" : [],
      "adga" : []
    }
    this.populateOptions();
  }

  clearNotification() : void {
    this.notification = "";
    this.isSuccess = false;
    this.showNotification = false;
  }

  addProcess() :  void {
    this.isSubmitLoading = true;
    let resultData : any = {}
    resultData["name"] = this.newVariableName;
    resultData["equation"] = this.equationString;
    console.log(resultData);
    this.apiService.addProcess(resultData)
    .subscribe(processData => {
      if (processData.status == 200) {
        this.isSuccess = true;
      }
      this.notification = processData.data;
      this.showNotification = true;
      this.isSubmitLoading = false;
    });
  }
}

type PlotData = Record<string, any[]>;
