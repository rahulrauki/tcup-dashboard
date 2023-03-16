import { Component, OnInit, OnDestroy } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ApiServiceService } from "./api-service.service";

import config from "../assets/tcup-config.json";
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  constructor (private apiService : ApiServiceService) { }

  title = 'tcup-dashboard';
  isClientOn : boolean = false;
  setIntervalObject! : any; 
  pageNames : any[] = config.pagenames;
  activeLink = this.pageNames[0];
  background: ThemePalette = 'primary';

  ngOnInit(): void {
    // Note: Don't send the callback as is instead send a arrow function that call the function, because "this" context changes while using service workers
    this.setIntervalObject = setInterval(() => this.getClientStatus(), 5000); 
  }

  ngOnDestroy(): void {
    if (this.setIntervalObject){
      clearInterval(this.setIntervalObject);
    }
  }

  getClientStatus() : void {
    this.apiService.getClientStatus()
    .subscribe(clientStatus => {
      if (clientStatus.status == 200){
        if (clientStatus.current_status == "Online") this.isClientOn = true;
        else if (clientStatus.current_status == "Offline") this.isClientOn = false;
      }
    });
  }

}
