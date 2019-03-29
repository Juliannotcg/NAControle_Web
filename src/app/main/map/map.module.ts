import { AgmCoreModule } from '@agm/core';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MapComponent } from './map.component';
import { Routes, RouterModule } from '@angular/router';
import { MatButtonModule, MatFormFieldModule, MatInputModule, MatSnackBarModule } from '@angular/material';
import { MapService } from './map.service';


const routes: Routes = [
    {
        path      : 'map',
        component: MapComponent
    }
];

@NgModule({
  imports: [
    RouterModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyDryBws_KN0rstpvoaihKGxLBGgxEnQtTY",
      libraries: ["places"]
    }),
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    RouterModule.forChild(routes),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule
  ],
  providers: [MapService],
  declarations: [ MapComponent ]
})
export class MapModule {}