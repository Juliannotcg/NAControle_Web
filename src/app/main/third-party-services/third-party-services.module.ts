import { CartoriosService } from './cartorios.service';
import { NgModule } from '@angular/core';
import { TitulosService } from './titulos.service';

@NgModule({
    providers      : [
        CartoriosService, 
        TitulosService
    ]
})
export class ThirdPartyServicesModule
{
}
