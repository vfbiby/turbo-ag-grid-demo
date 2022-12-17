import { SortChangedEvent } from "ag-grid-community";
import { fireEvent, screen } from "@testing-library/react";

export const getSortedColumns = (sortEvent: SortChangedEvent) => {
  return sortEvent.columnApi
    .getAllGridColumns()
    .filter((col) => col.isSorting());
};

export const clickColumnHeaderOf = (byText: string) => {
  fireEvent.click(screen.getByText(byText));
};
