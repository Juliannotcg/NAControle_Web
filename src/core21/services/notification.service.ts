import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class NotificationService 
{
    constructor(private _snackBar: MatSnackBar) { }

    notifySuccessMessage(message: string): void
    {
        this._snackBar.open(message, null,
        {
            duration: 3000,
            panelClass: ['success']
        });
    }

    notifyErrorMessage(message: string): void
    {
        this._snackBar.open(message, null,
        {
            duration: 5000,
            panelClass: ['error']
        });
    }
}
