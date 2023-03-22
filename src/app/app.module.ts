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
import { AddRelationComponent } from './add-relation/add-relation.component';
// NgModules imports
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatRadioModule, MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';
import * as PlotlyJS from 'plotly.js-dist-min';
import { PlotlyModule } from 'angular-plotly.js';

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
  providers: [{
    provide: MAT_RADIO_DEFAULT_OPTIONS,
    useValue: { color: 'primary' },
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
