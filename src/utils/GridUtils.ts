import { SortChangedEvent } from "ag-grid-community";
import { fireEvent } from "@testing-library/react";
import { getHeaderColumn } from "./AgGridTestUtils";

export const getSortedColumns = (sortEvent: SortChangedEvent) => {
  return sortEvent.columnApi
    .getAllGridColumns()
    .filter((col) => col.isSorting());
};

export const clickColumnHeaderOf = (byText: string) => {
  fireEvent.click(getHeaderColumn(byText));
};
