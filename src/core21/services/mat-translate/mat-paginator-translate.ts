import { MatPaginatorIntl } from '@angular/material';


const ptBrRangeLabel = (page: number, pageSize: number, length: number) =>
{
  if (length === 0 || pageSize === 0) { return `0 de ${length}`; }

  length = Math.max(length, 0);

  const startIndex = page * pageSize;


  const endIndex = startIndex < length ?
      Math.min(startIndex + pageSize, length) :
      startIndex + pageSize;

  return `${startIndex + 1} - ${endIndex} de ${length}`;
};

export function getPtBrPaginatorTranslate()
{
  const paginator = new MatPaginatorIntl();

  paginator.itemsPerPageLabel = 'Itens por página:';
  paginator.nextPageLabel = 'Próxima página';
  paginator.previousPageLabel = 'Página anterior';
  paginator.lastPageLabel = 'Última página';
  paginator.firstPageLabel = 'Primeira página';
  paginator.getRangeLabel = ptBrRangeLabel;

  return paginator;
}
