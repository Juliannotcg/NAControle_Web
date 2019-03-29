import { FuseUtils } from '@fuse/utils';

export class Grupo
{
    id: string;
    nome: string;
    latitude: number;
    longitude: number;
    label?: string;
    draggable: boolean;
    iconUrl: string;

    constructor(grupo)
    {
        {
            this.id = grupo.id || '';
            this.nome = grupo.nome || '';
            this.latitude = grupo.latitude || '';
            this.longitude = grupo.longitude || '';
            this.label = grupo.label || '';
            this.iconUrl = grupo.iconUrl || '';
        }
    }
}
