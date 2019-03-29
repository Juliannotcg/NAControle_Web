import { FuseUtils } from '@fuse/utils';

export class Grupo
{
    id: string;
    nome: string;
    latitude: number;
    longitude: number;
    label: string;
    draggable: boolean;
    iconUrl: string;
    

    /**
     * Constructor
     *
     * @param grupo
     */
    constructor(grupo?)
    {
        grupo = grupo || {};
        this.id = grupo.id || FuseUtils.generateGUID();
        this.nome = grupo.nome || '';
        this.latitude = grupo.latitude || '';
        this.longitude = grupo.longitude || '';
        this.draggable = grupo.draggable || '';
        this.iconUrl = grupo.iconUrl || '';
    }
}
