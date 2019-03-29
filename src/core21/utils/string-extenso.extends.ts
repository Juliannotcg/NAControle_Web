interface String
{
    extenso(this): string;
}

String.prototype.extenso = (c?: string): string =>
{
    if (!c)
    {
        return '';
    }
    
    const ex = [
        // tslint:disable-next-line:max-line-length
        ['zero', 'um', 'dois', 'três', 'quatro', 'cinco', 'seis', 'sete', 'oito', 'nove', 'dez', 'onze', 'doze', 'treze', 'quatorze', 'quinze', 'dezesseis', 'dezessete', 'dezoito', 'dezenove'],
        ['dez', 'vinte', 'trinta', 'quarenta', 'cinqüenta', 'sessenta', 'setenta', 'oitenta', 'noventa'],
        ['cem', 'cento', 'duzentos', 'trezentos', 'quatrocentos', 'quinhentos', 'seiscentos', 'setecentos', 'oitocentos', 'novecentos'],
        // tslint:disable-next-line:max-line-length
        ['mil', 'milhão', 'bilhão', 'trilhão', 'quadrilhão', 'quintilhão', 'sextilhão', 'setilhão', 'octilhão', 'nonilhão', 'decilhão', 'undecilhão', 'dodecilhão', 'tredecilhão', 'quatrodecilhão', 'quindecilhão', 'sedecilhão', 'septendecilhão', 'octencilhão', 'nonencilhão']
    ];
    let a, v, i, sl;
    const n: any = this.replace(c ? /[^,\d]/g : /\D/g, '').split(','), e = ' e ', $ = 'real', d = 'centavo', r = [];
    for (let f = n.length - 1, l, j: any = -1, s = [], t: any = ''; ++j <= f; s = [])
    {
        // tslint:disable-next-line:no-unused-expression
        j && (n[j] = ((('.' + n[j]) as any) * 1).toFixed(2).slice(2));
        if (!(a = (v = n[j]).slice((l = v.length) % 3).match(/\d{3}/g), v = l % 3 ? [v.slice(0, l % 3)] : [], v = a ? v.concat(a) : v).length) { continue; }
        for (a = -1, l = v.length; ++a < l; t = '')
        {
            if (!(i = v[a] * 1)) { continue; }
            // tslint:disable-next-line:no-unused-expression
            i % 100 < 20 && (t += ex[0][i % 100]) ||
            // tslint:disable-next-line:no-bitwise
            i % 100 + 1 && (t += ex[1][(i % 100 / 10 >> 0) - 1] + (i % 10 ? e + ex[0][i % 10] : ''));
            // tslint:disable-next-line:no-bitwise
            s.push((i < 100 ? t : !(i % 100) ? ex[2][i === 100 ? 0 : i / 100 >> 0] : (ex[2][i / 100 >> 0] + e + t)) +
            ((t = l - a - 2) > -1 ? ' ' + (i > 1 && t > 0 ? ex[3][t].replace('ão', 'ões') : ex[3][t]) : ''));
        }
        a = ((sl = s.length) > 1 ? (a = s.pop(), s.join(' ') + e + a) : s.join('') || ((!j && (n[j + 1] * 1 > 0) || r.length) ? '' : ex[0][0]));
        // tslint:disable-next-line:no-unused-expression
        a && r.push(a + (c ? (' ' + (v.join('') * 1 > 1 ? j ? d + 's' : (/0{6,}$/.test(n[0]) ? 'de ' : '') + $.replace('l', 'is') : j ? d : $)) : ''));
    }
    return r.join(e);
};
