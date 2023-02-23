import { Component } from '@angular/core';
import { ThemePalette } from '@angular/material/core';

import config from "../assets/tcup-config.json";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tcup-dashboard';
  pageNames : any[] = config.pagenames;
  activeLink = this.pageNames[0];
  background: ThemePalette = 'primary';

}
