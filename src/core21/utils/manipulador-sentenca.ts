
export class ManipuladorSentenca
{
    static masculinoOuFeminino(sentencaMasculino: string, sentencaFeminino: string, sexo: number): string
    {
        if (sexo === 2) {
            return sentencaFeminino;
        }

        return sentencaMasculino;
    }

    static singularOuPlural(sentencaSingular: string, sentencaPlural: string, quantidade: number): string
    {
        if (quantidade === 1) {
            return sentencaSingular;
        }

        return sentencaPlural;
    }
}
