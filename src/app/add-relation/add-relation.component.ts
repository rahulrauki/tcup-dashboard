import { Component } from '@angular/core';
import { ApiServiceService } from '../api-service.service';
import { ThemePalette } from '@angular/material/core';
import config from '../../assets/tcup-config.json';

@Component({
  selector: 'app-add-relation',
  templateUrl: './add-relation.component.html',
  styleUrls: ['./add-relation.component.css']
})
export class AddRelationComponent {

  constructor(private apiService: ApiServiceService) {}

  fetchData : PlotData = {}
  variableOptions : string[] = [] ;
  selectedVariable! : string;
  secondVariable! : string | number;
  newVariableName! : string ;
  secondVariableOption! : string;
  isLoading : boolean  =  false;
  isSubmitLoading : boolean  =  false;
  showNotification : boolean = false;
  isSuccess : boolean = false;
  notification : string = "";
  background : ThemePalette = "primary";
  messageIfTrue! : string;
  messageIfFalse! : string;

  operatorOptions : OperatorOptions[] = config?.relation_operator_options;
  selectedOperator! : string;

  clearEquation() : void {
    this.selectedVariable = "";
    this.selectedOperator = "";
    this.secondVariable = "";
    this.newVariableName = "";
    this.messageIfTrue = "";
    this.messageIfFalse = "";
    this.isSubmitLoading = false;
    this.clearNotification();
  }

  clearPreviousSelection() : void {
    this.secondVariable = "";
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

  addRelation() :  void {
    this.isSubmitLoading = true;
    let resultData : any = {}
    resultData["condition"] = [
      `${this.selectedVariable} ${this.selectedOperator} ${this.secondVariable.toString()}`,
      this.messageIfTrue,
      this.messageIfFalse,
      this.newVariableName
    ];
    console.log(resultData);
    this.apiService.addRelation(resultData)
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

interface OperatorOptions {
  name: string,
  symbol : string
}
