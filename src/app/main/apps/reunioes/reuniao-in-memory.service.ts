import { ServicesInMemoryService } from 'core21/services/services-in-memory.service';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { FuseUtils } from '@fuse/utils';

@Injectable()
export class ReuniaoInMemoryService extends ServicesInMemoryService
{

    constructor(public snackBar: MatSnackBar)
    {
        super();

        const reuniao = [];
        for (let index = 1; index <= 20; index++) 
        {
            reuniao.push(
            {  
                'dia': 'Segunda-feira',
                'dataAbertura': Date.now(),
                'horarioInicio': '19:00',
                'horarioFim': '21:00',
                'secretario': 'Anderson',
                'aberta': true
            });
        }

        super.init(reuniao);
    }

    add(obj: any): Promise<any>
    {
        return new Promise((resolve, reject) =>
        {
            obj.situacao = 1;
            obj.data = Date.now();
            
            super.add(obj).then((response) =>
            {
                this.snackBar.open('Reuniao cadastrada com sucesso.', null, { duration: 3000 });
                resolve(response);
            });
        });
    }

    delete(obj: any): Promise<any>
    {
        return new Promise((resolve, reject) =>
        {
            this.objs.splice(this.objs.indexOf(obj), 1);
            this.onObjsChanged.next(this.objs);

            resolve(this.objs);
        });
    }
}
