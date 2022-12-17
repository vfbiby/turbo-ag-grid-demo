import { waitFor } from "@testing-library/react";
import assert from "node:assert/strict";

// TODO: create parent div reference to handle multiple grids on a page
// Synchronisation

const waitForGridToBeInTheDOM = () => {
  return waitFor(() => {
    expect(document.querySelector(".ag-root-wrapper")).toBeInTheDocument();
  });
};

// since our grid starts with no data, when the overlay has gone, data has loaded
const waitForDataToHaveLoaded = () => {
  return waitFor(() => {
    expect(document.querySelector(".ag-overlay-no-rows-center")).toBeNull();
  });
};

const waitForPagination = () => {
  return new Promise((resolve, reject) => {
    let paginationPanel: Element | null | undefined = undefined;

    waitFor(() => {
      paginationPanel = document.querySelector(".ag-paging-panel");
      expect(paginationPanel).toBeInTheDocument();
    })
      .then(() => {
        const panelId = paginationPanel?.getAttribute("id");
        const panelData: {
          panelId?: string | null;
          firstRow?: string | null;
          lastRow?: string | null;
          rowCount?: string | null;
        } = {
          panelId: panelId,
        };

        panelData.firstRow = document.querySelector(
          `#${panelId}-first-row`
        )?.textContent;
        panelData.lastRow = document.querySelector(
          `#${panelId}-last-row`
        )?.textContent;
        panelData.rowCount = document.querySelector(
          `#${panelId}-row-count`
        )?.textContent;
        resolve(panelData);
      })
      .catch((err) => reject(err));
  });
};

const columnNamed = (cellName: string) => {
  return `.ag-cell[col-id="${cellName}"]`;
};

const rowWithId = (rowId: number) => {
  return `.ag-row[row-id="${rowId}"]`;
};

// helper method to find a row id and cell named in that row
const getRowCellNamed = (rowId: number, cellName: string) => {
  return document.querySelector(rowWithId(rowId) + " " + columnNamed(cellName));
};

// given a cell, get the value of the cell
const getCellValue = (cell: Element) => {
  return cell;
};

const findFirstContainerElementWithClass = (
  anElement: Element,
  findClassName: string
): Element | undefined => {
  const parent = anElement.parentNode as Element;
  const classes = parent?.className?.split(" ");
  if (classes.includes(findClassName)) {
    return parent;
  }

  if (classes.includes("ag-root-wrapper")) {
    // hit edge of grid, go no further
    return undefined;
  }

  return findFirstContainerElementWithClass(parent, findClassName);
};

const getNamedCellsWithValues = (cellName: string, cellValue: string) => {
  const cells = Array.from(document.querySelectorAll(columnNamed(cellName)));
  return cells.filter((cell) => getCellValue(cell)?.textContent === cellValue);
};

const getFirstRowWithNamedCellValue = (cellName: string, cellValue: string) => {
  const cells = getNamedCellsWithValues(cellName, cellValue);
  for (const cell of cells) {
    if (getCellValue(cell)?.textContent === cellValue) {
      return findFirstContainerElementWithClass(cell, "ag-row");
    }
  }
  return undefined;
};

export const rowWithIndexId = (indexId: number) => {
  return `.ag-row[row-index="${indexId}"]`;
};

export function getRowWithIndexIdCellNamed(indexId: number, cellName: string) {
  return document.querySelector(
    rowWithIndexId(indexId) + " " + columnNamed(cellName)
  );
}

export const headerColumnNamed = (cellName: string) => {
  return `.ag-header-cell[col-id="${cellName.toLowerCase()}"]`;
};

export function getHeaderColumn(byText: string) {
  const element = document
    .querySelector(headerColumnNamed(byText.toLowerCase()))
    ?.querySelector<HTMLElement>(" .ag-header-cell-text");
  assert(
    element !== null && element !== undefined,
    `Unable to find an header element with text ${byText}.`
  );
  return element;
}

export {
  // synchronisation methods
  waitForGridToBeInTheDOM,
  waitForPagination,
  waitForDataToHaveLoaded,
  // selectors
  columnNamed,
  getFirstRowWithNamedCellValue,
  getNamedCellsWithValues,
  findFirstContainerElementWithClass,
  getCellValue,
  getRowCellNamed,
};
