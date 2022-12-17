import assert from "node:assert/strict";

export class AgGridSelector {
  private selectedElement: HTMLElement | null | undefined = undefined;

  getRowOf(indexId: number) {
    this.selectedElement = document.querySelector<HTMLElement>(
      ".ag-center-cols-container " + this.rowWithIndexId(indexId)
    );
    return this;
  }

  columnNamed(cellName: string) {
    return `.ag-cell[col-id="${cellName}"]`;
  }

  rowWithIndexId(indexId: number) {
    return `.ag-row[row-index="${indexId}"]`;
  }

  getByColumn(columnName: string) {
    this.selectedElement = this.selectedElement?.querySelector(
      this.columnNamed(columnName.toLowerCase())
    );
    return this;
  }

  getText() {
    return this.selectedElement?.textContent?.trim();
  }

  getHeaderOf(cellName: string) {
    this.selectedElement = document.querySelector<HTMLElement>(
      `.ag-header-cell[col-id="${cellName.toLowerCase()}"]`
    );
    return this;
  }

  getFilterIcon() {
    let element = this.selectedElement?.querySelector(".ag-icon-menu");
    assert(element !== null && element !== undefined, "filter icon not exist.");
    return element;
  }

  getSortIcon() {
    let element = this.selectedElement?.querySelector<HTMLElement>(
      " .ag-header-cell-text"
    );
    assert(element !== null && element !== undefined, "sort icon not exist.");
    return element;
  }
}
