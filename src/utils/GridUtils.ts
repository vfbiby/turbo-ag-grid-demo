import { SortChangedEvent } from "ag-grid-community";
import { fireEvent } from "@testing-library/react";
import { AgGridSelector } from "./AgGridSelector";

export const getSortedColumns = (sortEvent: SortChangedEvent) => {
  return sortEvent.columnApi
    .getAllGridColumns()
    .filter((col) => col.isSorting());
};

export const clickHeaderSortIconOf = (byText: string) => {
  let gridSelector = new AgGridSelector();
  fireEvent.click(gridSelector.getHeaderOf(byText).getSortIcon());
};
