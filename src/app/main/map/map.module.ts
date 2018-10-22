import { AgmCoreModule } from '@agm/core';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './map.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path      : 'map',
        component: AppComponent
    }
];

@NgModule({
  imports: [
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyDbeOCn3WjCEYpumjea7OcT2rIX5Ulk06Q",
      libraries: ["places"]
    }),
    RouterModule.forChild(routes),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [ AppComponent ]
})
export class MapModule {}