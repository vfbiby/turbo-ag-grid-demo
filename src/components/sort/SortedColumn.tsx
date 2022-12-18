import { Column, SortChangedEvent } from "ag-grid-community";

export interface SortedColumnProps {
  name: string;
  order: string | null | undefined;
}

export function SortedColumn({ columns }: { columns: SortedColumnProps[] }) {
  return (
    <div>
      {columns.map((column) => (
        <>
          <span>{column.name}</span>
          <span>{column.order}</span>
        </>
      ))}
    </div>
  );
}

export function formatColumn(sortedColumns: Column[]) {
  const formattedColumns: SortedColumnProps[] = [];
  sortedColumns.forEach((col) => {
    formattedColumns.push({ name: col.getColId(), order: col.getSort() });
  });
  return formattedColumns;
}

export const getSortedColumns = (sortEvent: SortChangedEvent) => {
  return sortEvent.columnApi
    .getAllGridColumns()
    .filter((col) => col.isSorting());
};
