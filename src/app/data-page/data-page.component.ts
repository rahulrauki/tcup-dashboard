import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource, _MatTableDataSource} from '@angular/material/table';
import { ThemePalette } from '@angular/material/core';
import { ApiServiceService } from '../api-service.service';

@Component({
  selector: 'app-data-page',
  templateUrl: './data-page.component.html',
  styleUrls: ['./data-page.component.css']
})
export class DataPageComponent implements AfterViewInit {

  constructor( private apiService : ApiServiceService ) {}

  //class Fields
  isFetchLoading : boolean = false;
  isExportLoading : boolean = false;
  isReportLoading : boolean = false;
  isInsightLoading : boolean = false;
  showRawTable : boolean =  false;
  showPaginator : boolean = false;
  showInsights : boolean = true;
  insightsData! : string; 

  columns : ColumnData[] = [];
  displayedColumns! : string[];
  dataSource : any;
  apiFetchData : any;
  background : ThemePalette = 'primary';

  // columns : ColumnData[] = [
  //   {
  //     columnDef: 'position',
  //     header: 'No.',
  //     cell: (element: PeriodicElement) => `${element.position}`,
  //   },
  //   {
  //     columnDef: 'name',
  //     header: 'Name',
  //     cell: (element: PeriodicElement) => `${element.name}`,
  //   },
  //   {
  //     columnDef: 'weight',
  //     header: 'Weight',
  //     cell: (element: PeriodicElement) => `${element.weight}`,
  //   },
  //   {
  //     columnDef: 'symbol',
  //     header: 'Symbol',
  //     cell: (element: PeriodicElement) => `${element.symbol}`,
  //   },
  // ];

  // @ViewChild(MatPaginator)
  // paginator!: MatPaginator;
  // color : ThemePalette = 'primary';

  fillColumnData() : void {
    this.isFetchLoading = true;
    let sample = ELEMENT_DATA[0];
    this.dataSource = new MatTableDataSource<any>(ELEMENT_DATA);
    for (let attr of Object.keys(sample)) {
      let currColumnData : ColumnData = {
        columnDef : attr,
        header : attr.charAt(0).toUpperCase() + attr.slice(1),
        cell : (element : any) => `${element[attr]}`
      }
      this.columns.push(currColumnData);
    }
    this.displayedColumns = this.columns.map(c => c.columnDef);
    this.showRawTable = true;
    this.showPaginator = true;
    this.isFetchLoading = false;
  }

  getLatestData() : void{
    this.isFetchLoading = true;
    this.apiService.getData()
    .subscribe(data => {
      if (data.status == 200){

      }
    });
  }

  closeInsights() : void {
    this.showInsights = false;
  }

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
  }
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

export interface ColumnData {
  columnDef : string,
  header : string,
  cell : Cell
}

export type Cell = (element : any) => string;

const ELEMENT_DATA: any[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H', data : 1, random : 3, test: 4, temp: 34, speed:34, avg:34, rate:53, twrwerwewre:35, sdfrerysfdgey:434, tregrryery:53, jgidsiti: "radf", dggawef:"asdf", ddsfgsdfgdsfgdfgfsdfgsfgdfg: 234, asgagteaasegawewaefae: 345, dgahaehfhsdhtsrthsdhsrydsfh:65},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He', data : 1, random : 3, test: 4, temp: 34, speed:34, avg:34, rate:53, twrwerwewre:35, sdfrerysfdgey:434, tregrryery:53, jgidsiti: "radf", dggawef:"asdf", ddsfgsdfgdsfgdfgfsdfgsfgdfg: 234, asgagteaasegawewaefae: 345, dgahaehfhsdhtsrthsdhsrydsfh:65},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li', data : 1, random : 3, test: 4, temp: 34, speed:34, avg:34, rate:53, twrwerwewre:35, sdfrerysfdgey:434, tregrryery:53, jgidsiti: "radf", dggawef:"asdf", ddsfgsdfgdsfgdfgfsdfgsfgdfg: 234, asgagteaasegawewaefae: 345, dgahaehfhsdhtsrthsdhsrydsfh:65},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be', data : 1, random : 3, test: 4, temp: 34, speed:34, avg:34, rate:53, twrwerwewre:35, sdfrerysfdgey:434, tregrryery:53, jgidsiti: "radf", dggawef:"asdf", ddsfgsdfgdsfgdfgfsdfgsfgdfg: 234, asgagteaasegawewaefae: 345, dgahaehfhsdhtsrthsdhsrydsfh:65},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B', data : 1, random : 3, test: 4, temp: 34, speed:34, avg:34, rate:53, twrwerwewre:35, sdfrerysfdgey:434, tregrryery:53, jgidsiti: "radf", dggawef:"asdf", ddsfgsdfgdsfgdfgfsdfgsfgdfg: 234, asgagteaasegawewaefae: 345, dgahaehfhsdhtsrthsdhsrydsfh:65},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C', data : 1, random : 3, test: 4, temp: 34, speed:34, avg:34, rate:53, twrwerwewre:35, sdfrerysfdgey:434, tregrryery:53, jgidsiti: "radf", dggawef:"asdf", ddsfgsdfgdsfgdfgfsdfgsfgdfg: 234, asgagteaasegawewaefae: 345, dgahaehfhsdhtsrthsdhsrydsfh:65},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N', data : 1, random : 3, test: 4, temp: 34, speed:34, avg:34, rate:53, twrwerwewre:35, sdfrerysfdgey:434, tregrryery:53, jgidsiti: "radf", dggawef:"asdf", ddsfgsdfgdsfgdfgfsdfgsfgdfg: 234, asgagteaasegawewaefae: 345, dgahaehfhsdhtsrthsdhsrydsfh:65},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O', data : 1, random : 3, test: 4, temp: 34, speed:34, avg:34, rate:53, twrwerwewre:35, sdfrerysfdgey:434, tregrryery:53, jgidsiti: "radf", dggawef:"asdf", ddsfgsdfgdsfgdfgfsdfgsfgdfg: 234, asgagteaasegawewaefae: 345, dgahaehfhsdhtsrthsdhsrydsfh:65},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F', data : 1, random : 3, test: 4, temp: 34, speed:34, avg:34, rate:53, twrwerwewre:35, sdfrerysfdgey:434, tregrryery:53, jgidsiti: "radf", dggawef:"asdf", ddsfgsdfgdsfgdfgfsdfgsfgdfg: 234, asgagteaasegawewaefae: 345, dgahaehfhsdhtsrthsdhsrydsfh:65},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne', data : 1, random : 3, test: 4, temp: 34, speed:34, avg:34, rate:53, twrwerwewre:35, sdfrerysfdgey:434, tregrryery:53, jgidsiti: "radf", dggawef:"asdf", ddsfgsdfgdsfgdfgfsdfgsfgdfg: 234, asgagteaasegawewaefae: 345, dgahaehfhsdhtsrthsdhsrydsfh:65},
  {position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na', data : 1, random : 3, test: 4, temp: 34, speed:34, avg:34, rate:53, twrwerwewre:35, sdfrerysfdgey:434, tregrryery:53, jgidsiti: "radf", dggawef:"asdf", ddsfgsdfgdsfgdfgfsdfgsfgdfg: 234, asgagteaasegawewaefae: 345, dgahaehfhsdhtsrthsdhsrydsfh:65},
  {position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg', data : 1, random : 3, test: 4, temp: 34, speed:34, avg:34, rate:53, twrwerwewre:35, sdfrerysfdgey:434, tregrryery:53, jgidsiti: "radf", dggawef:"asdf", ddsfgsdfgdsfgdfgfsdfgsfgdfg: 234, asgagteaasegawewaefae: 345, dgahaehfhsdhtsrthsdhsrydsfh:65},
  {position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al', data : 1, random : 3, test: 4, temp: 34, speed:34, avg:34, rate:53, twrwerwewre:35, sdfrerysfdgey:434, tregrryery:53, jgidsiti: "radf", dggawef:"asdf", ddsfgsdfgdsfgdfgfsdfgsfgdfg: 234, asgagteaasegawewaefae: 345, dgahaehfhsdhtsrthsdhsrydsfh:65},
  {position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si', data : 1, random : 3, test: 4, temp: 34, speed:34, avg:34, rate:53, twrwerwewre:35, sdfrerysfdgey:434, tregrryery:53, jgidsiti: "radf", dggawef:"asdf", ddsfgsdfgdsfgdfgfsdfgsfgdfg: 234, asgagteaasegawewaefae: 345, dgahaehfhsdhtsrthsdhsrydsfh:65},
  {position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P', data : 1, random : 3, test: 4, temp: 34, speed:34, avg:34, rate:53, twrwerwewre:35, sdfrerysfdgey:434, tregrryery:53, jgidsiti: "radf", dggawef:"asdf", ddsfgsdfgdsfgdfgfsdfgsfgdfg: 234, asgagteaasegawewaefae: 345, dgahaehfhsdhtsrthsdhsrydsfh:65},
  {position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S', data : 1, random : 3, test: 4, temp: 34, speed:34, avg:34, rate:53, twrwerwewre:35, sdfrerysfdgey:434, tregrryery:53, jgidsiti: "radf", dggawef:"asdf", ddsfgsdfgdsfgdfgfsdfgsfgdfg: 234, asgagteaasegawewaefae: 345, dgahaehfhsdhtsrthsdhsrydsfh:65},
  {position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl', data : 1, random : 3, test: 4, temp: 34, speed:34, avg:34, rate:53, twrwerwewre:35, sdfrerysfdgey:434, tregrryery:53, jgidsiti: "radf", dggawef:"asdf", ddsfgsdfgdsfgdfgfsdfgsfgdfg: 234, asgagteaasegawewaefae: 345, dgahaehfhsdhtsrthsdhsrydsfh:65},
  {position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar', data : 1, random : 3, test: 4, temp: 34, speed:34, avg:34, rate:53, twrwerwewre:35, sdfrerysfdgey:434, tregrryery:53, jgidsiti: "radf", dggawef:"asdf", ddsfgsdfgdsfgdfgfsdfgsfgdfg: 234, asgagteaasegawewaefae: 345, dgahaehfhsdhtsrthsdhsrydsfh:65},
  {position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K', data : 1, random : 3, test: 4, temp: 34, speed:34, avg:34, rate:53, twrwerwewre:35, sdfrerysfdgey:434, tregrryery:53, jgidsiti: "radf", dggawef:"asdf", ddsfgsdfgdsfgdfgfsdfgsfgdfg: 234, asgagteaasegawewaefae: 345, dgahaehfhsdhtsrthsdhsrydsfh:65},
  {position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca', data : 1, random : 3, test: 4, temp: 34, speed:34, avg:34, rate:53, twrwerwewre:35, sdfrerysfdgey:434, tregrryery:53, jgidsiti: "radf", dggawef:"asdf", ddsfgsdfgdsfgdfgfsdfgsfgdfg: 234, asgagteaasegawewaefae: 345, dgahaehfhsdhtsrthsdhsrydsfh:65},
];
