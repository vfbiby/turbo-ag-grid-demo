import { Column, SortChangedEvent } from "ag-grid-community";
import { SortedColumnProps } from "./SortedColumn";

export function formatSortedColumn(sortedColumns: Column[]) {
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
