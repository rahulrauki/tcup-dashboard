import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from "./landing-page/landing-page.component"
import { DataPageComponent } from "./data-page/data-page.component"
import { MapPageComponent } from "./map-page/map-page.component"
import { PlotPageComponent } from "./plot-page/plot-page.component"
import { AddProcessComponent } from "./add-process/add-process.component"

const routes: Routes = [
  { path: 'landing-page', component: LandingPageComponent , title: "Welcome to TCUP Dashboard" },
  { path: 'data-page', component: DataPageComponent, title: "Processesd Data" },
  { path: 'map-page', component: MapPageComponent, title: "Map Data" },
  { path: 'plot-page', component: PlotPageComponent, title: "Plotting" },
  { path: 'add-process', component: AddProcessComponent, title: "Add Process" },
  { path: '',   redirectTo: '/landing-page', pathMatch: 'full' }, // redirect to `first-component`
  { path: '**', component: LandingPageComponent },  // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
