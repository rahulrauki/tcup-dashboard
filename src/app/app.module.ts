import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
// Components imports
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { MapPageComponent } from './map-page/map-page.component';
import { DataPageComponent } from './data-page/data-page.component';
import { PlotPageComponent } from './plot-page/plot-page.component';
import { AddProcessComponent } from './add-process/add-process.component';
// NgModules imports
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import {MatRadioModule} from '@angular/material/radio';
import * as PlotlyJS from 'plotly.js-dist-min';
import { PlotlyModule } from 'angular-plotly.js';
import { AddRelationComponent } from './add-relation/add-relation.component';

PlotlyModule.plotlyjs = PlotlyJS;

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    MapPageComponent,
    DataPageComponent,
    PlotPageComponent,
    AddProcessComponent,
    AddRelationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTabsModule,
    PlotlyModule,
    MatPaginatorModule,
    MatTableModule,
    HttpClientModule,
    FormsModule,
    MatRadioModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
