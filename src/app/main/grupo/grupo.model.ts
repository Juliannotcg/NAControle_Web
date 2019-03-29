import { FuseUtils } from '@fuse/utils';

export class Grupo
{
    id: string;
    nome: string;
    sigla: string;

    constructor(grupo)
    {
        {
            this.id = grupo.id || '';
            this.nome = grupo.nome || '';
            this.sigla = grupo.sigla || '';
        }
    }
}
