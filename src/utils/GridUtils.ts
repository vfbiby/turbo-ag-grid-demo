import { SortChangedEvent } from "ag-grid-community";
import { fireEvent } from "@testing-library/react";
import assert from "node:assert/strict";

export const getSortedColumns = (sortEvent: SortChangedEvent) => {
  return sortEvent.columnApi
    .getAllGridColumns()
    .filter((col) => col.isSorting());
};

const headerColumnNamed = (cellName: string) => {
  return `.ag-header-cell[col-id="${cellName.toLowerCase()}"] .ag-header-cell-text`;
};

function getHeaderColumn(byText: string) {
  const element = document.querySelector<HTMLElement>(
    headerColumnNamed(byText.toLowerCase())
  );
  assert(
    element !== null,
    `Unable to find an header element with text ${byText}.`
  );
  return element;
}

export const clickColumnHeaderOf = (byText: string) => {
  fireEvent.click(getHeaderColumn(byText));
};
