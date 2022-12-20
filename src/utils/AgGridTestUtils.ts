import { fireEvent, waitFor } from "@testing-library/react";
import { AgGridSelector } from "./AgGridSelector";

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

type stringOrNull = string | undefined | null;

type rowProps = {
  firstRow?: stringOrNull;
  lastRow?: stringOrNull;
  rowCount?: stringOrNull;
};

const waitForPagination = () => {
  return new Promise<rowProps>((resolve, reject) => {
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
  return cells.filter((cell) => cell?.textContent === cellValue);
};

const getFirstRowWithNamedCellValue = (cellName: string, cellValue: string) => {
  const cells = getNamedCellsWithValues(cellName, cellValue);
  for (const cell of cells) {
    /* istanbul ignore else -- @preserve */
    if (cell?.textContent === cellValue) {
      return findFirstContainerElementWithClass(cell, "ag-row");
    }
  }
  return undefined;
};

export const clickSortIconOf = (byText: string) => {
  let gridSelector = new AgGridSelector();
  fireEvent.click(gridSelector.getHeaderOf(byText).getSortIcon());
};

export function radioOperatorOf(name: string) {
  return document.querySelector<HTMLElement>(
    `.ag-filter-condition-operator-${name} .ag-input-field-label`
  );
}

export function clickFilterIconOf(cellName: string) {
  const gridSelector = new AgGridSelector();
  fireEvent.click(gridSelector.getHeaderOf(cellName).getFilterIcon());
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
};
