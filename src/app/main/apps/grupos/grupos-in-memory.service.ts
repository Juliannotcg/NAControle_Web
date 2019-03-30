import { ServicesInMemoryService } from 'core21/services/services-in-memory.service';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { FuseUtils } from '@fuse/utils';

@Injectable()
export class GruposInMemoryService extends ServicesInMemoryService
{

    constructor(public snackBar: MatSnackBar)
    {
        super();

        const grupos = [];
        for (let index = 1; index <= 20; index++) 
        {
            grupos.push(
            {  
                'nomeGrupo': 'Grupo só por hoje',
                'dataAbertura': Date.now(),
                'endereco': 'QNA 21, Tag. Centro ' + index,
                'rsg': 'ABDRE INCORPORA ' + index,
                'tesoureiro': 'Anderson' + index
            });
        }

        super.init(grupos);
    }

    add(obj: any): Promise<any>
    {
        return new Promise((resolve, reject) =>
        {
            obj.situacao = 1;
            obj.data = Date.now();
            
            super.add(obj).then((response) =>
            {
                this.snackBar.open('Grupo cadastrado com sucesso.', null, { duration: 3000 });
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
