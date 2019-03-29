
import { OnInit, OnDestroy, Inject } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { FuseConfigService } from '@fuse/services/config.service';

export class FuseSetingsDefaultComponent implements OnInit, OnDestroy
{
    public fuseConfig: any;

    protected _unsubscribeAll: Subject<any>;

    constructor(
        protected _fuseConfigService: FuseConfigService
    )
    {
        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void
    {
        this._fuseConfigService
            .config
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(config => this.fuseConfig = config);
    }

    ngOnDestroy(): void
    {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}
