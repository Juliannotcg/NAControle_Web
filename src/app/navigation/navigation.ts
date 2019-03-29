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
                id       : 'novas',
                title    : 'Novas',
                type     : 'item',
                icon     : 'new_releases',
                url      : '/grupos/novas',
                badge    : {
                    title    : '25',
                    translate: 'NAV.MAIL.BADGE',
                    class    : 'indigo'
                }
            },
            {
                id       : 'recebidas',
                title    : 'Recebidas',
                type     : 'item',
                icon     : 'call_received',
                url      : '/grupos/recebidas',
                badge    : {
                    title    : '100',
                    translate: 'NAV.MAIL.BADGE',
                    class    : 'blue'
                }
            },
            {
                id       : 'aceitas',
                title    : 'Aceitas',
                type     : 'item',
                icon     : 'beenhere',
                url      : '/grupos/aceitas',
                badge    : {
                    title    : '1500',
                    translate: 'NAV.MAIL.BADGE',
                    class    : 'green-700'
                }
            },
            {
                id       : 'rejeitadas',
                title    : 'Rejeitadas',
                type     : 'item',
                icon     : 'block',
                url      : '/grupos/rejeitadas',
                badge    : {
                    title    : '1500',
                    translate: 'NAV.MAIL.BADGE',
                    class    : 'red-500'
                }
            },
            {
                id       : 'pagas',
                title    : 'Pagas',
                type     : 'item',
                icon     : 'monetization_on',
                url      : '/grupos/pagas',
                badge    : {
                    title    : '2500',
                    translate: 'NAV.MAIL.BADGE',
                    class    : 'orange-800'
                }
            },
            {
                id       : 'canceladas',
                title    : 'Canceladas',
                type     : 'item',
                icon     : 'check',
                url      : '/grupos/canceladas',
                badge    : {
                    title    : '2500',
                    translate: 'NAV.MAIL.BADGE',
                    class    : 'grey-700'
                }
            },
        ],
    },
    {
        id       : 'dashboard',
        title    : 'Dashboard',
        type     : 'item',
        icon     : 'dashboard',
        url      : '/dashboard'
    },

];
