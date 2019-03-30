import { FuseUtils } from '@fuse/utils';

export class Grupo
{
    id: string;
    nomeGrupo: string;
    endereco: string;
    dataAbertura: Date;
    rsg: string;
    tesoureiro: string;
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
        this.nomeGrupo = grupo.nomeGrupo || '';
        this.endereco = grupo.endereco || '';
        this.dataAbertura = grupo.dataAbertura || '';
        this.rsg = grupo.rsg || '';
        this.tesoureiro = grupo.tesoureiro || '';
        this.latitude = grupo.latitude || '';
        this.longitude = grupo.longitude || '';
        this.draggable = grupo.draggable || '';
        this.iconUrl = grupo.iconUrl || '';
    }
}
