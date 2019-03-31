import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id       : 'menu',
        title    : 'Menu',
        type     : 'group',
    },
    {
        id       : 'controle',
        title    : 'Controle',
        type     : 'collapsable',
        icon     : 'apps',
        children : 
        [
            {
                id       : 'grupos',
                title    : 'Grupos',
                type     : 'item',
                icon     : 'announcement',
                url      : '/grupos/novas'
            },
            {
                id       : 'tesouraria',
                title    : 'Tesouraria',
                type     : 'item',
                icon     : 'monetization_on',
                url      : '/grupos/recebidas'
            },
            {
                id       : 'relatorios',
                title    : 'Relatorios',
                type     : 'item',
                icon     : 'beenhere',
                url      : '/grupos/aceitas'
            },
            {
                id       : 'reunioes',
                title    : 'Reuniões',
                type     : 'item',
                icon     : 'block',
                url      : '/grupos/rejeitadas'
            },
            {
                id       : 'servidores',
                title    : 'Servidores',
                type     : 'item',
                icon     : 'monetization_on',
                url      : '/grupos/pagas'
            }
        ],
    },
    {
        id       : 'subcomites',
        title    : 'Sub-Comitês',
        type     : 'collapsable',
        icon     : 'swap_horiz',
        children : 
        [
            {
                id       : 'hi',
                title    : 'Hospitais e instituições',
                type     : 'item',
                icon     : 'announcement',
                url      : '/grupos/novas'
            },
            {
                id       : 'ip',
                title    : 'Informação ao público',
                type     : 'item',
                icon     : 'monetization_on',
                url      : '/grupos/recebidas'
            },
            {
                id       : 'la',
                title    : 'Longo alcance',
                type     : 'item',
                icon     : 'beenhere',
                url      : '/grupos/aceitas'
            },
            {
                id       : 'lda',
                title    : 'Linha de ajuda',
                type     : 'item',
                icon     : 'block',
                url      : '/grupos/rejeitadas'
            },
        ],
    },
    {
        id       : 'manuais',
        title    : 'Manuais',
        type     : 'item',
        icon     : 'library_books',
        url      : '/dashboard'
    },
    {
        id       : 'dashboard',
        title    : 'Dashboard',
        type     : 'item',
        icon     : 'dashboard',
        url      : '/dashboard'
    },

];
