import { Injectable} from '@angular/core';
import { Router, Event, NavigationError } from '@angular/router';

import 'rxjs/add/observable/of';

@Injectable()
export class ErrorsService 
{

    constructor(
        private router: Router,
    ) 
    {
        this.router
            .events  
            .subscribe((event: Event) => { 
                if (event instanceof NavigationError) {
                    this.router.navigate(['/error']);         
                }
            });
    }
}
