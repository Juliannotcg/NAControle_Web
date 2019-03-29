
export function getLableFromSelectByValue(select: any, value): string
{
    let lable: string;

    select.options.forEach(option =>
    {
        if (option.value === value)
        {
            lable = option.label;
            return;
        }
    });

    return lable;
}
