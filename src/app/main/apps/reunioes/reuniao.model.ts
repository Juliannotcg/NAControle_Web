import { FuseUtils } from '@fuse/utils';

export class Reuniao
{
    id: string;
    dia: string;
    horarioInicio: string;
    horarioFim: string;
    secretario: string;
    aberta: boolean;

    /**
     * Constructor
     *
     * @param reuniao
     */
    constructor(reuniao?)
    {
        reuniao = reuniao || {};
        this.id = reuniao.id || FuseUtils.generateGUID();
        this.dia = reuniao.dia || '';
        this.horarioInicio = reuniao.horarioInicio || '';
        this.horarioFim = reuniao.horarioFim || '';
        this.secretario = reuniao.secretario || '';
        this.aberta = reuniao.aberta || '';
    }
}
