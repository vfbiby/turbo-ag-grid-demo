import {
  clickFilterIconOf,
  clickSortIconOf,
  columnNamed,
  findFirstContainerElementWithClass,
  getFirstRowWithNamedCellValue,
  getNamedCellsWithValues,
  radioOperatorOf,
  waitForDataToHaveLoaded,
  waitForPagination,
} from "./AgGridTestUtils";
import { fireEvent, render, screen } from "@testing-library/react";
import { SimpleGridComponent } from "../components/sort/GetSortedColumns";
import { vi } from "vitest";
import { gridData } from "../fixtures/GridFixture";

describe("AgGridTestUtils", () => {
  it("should click filter icon of make", () => {
    vi.spyOn(fireEvent, "click");
    render(<SimpleGridComponent sortCallbackFn={vi.fn} />);
    clickFilterIconOf("make");
    expect(fireEvent.click).toBeCalled();
  });

  it("should get specified radio", async () => {
    render(<SimpleGridComponent sortCallbackFn={vi.fn} />);
    clickFilterIconOf("make");
    expect(radioOperatorOf("or")).toBeInTheDocument();
  });

  it("should click sort icon", async () => {
    vi.spyOn(fireEvent, "click");
    render(<SimpleGridComponent sortCallbackFn={vi.fn} />);
    clickSortIconOf("make");
    expect(fireEvent.click).toBeCalled();
  });

  it("should get column specified by css", () => {
    expect(columnNamed("make")).toEqual('.ag-cell[col-id="make"]');
  });

  it("should get named cells with values", async () => {
    render(
      <SimpleGridComponent
        rowData={[
          { make: "Toyota", model: "Celica", price: 35000 },
          { make: "Toyota", model: "Celica", price: 29000 },
          ...gridData,
        ]}
        sortCallbackFn={vi.fn}
      />
    );
    await waitForDataToHaveLoaded();
    const values = getNamedCellsWithValues("make", "Toyota");
    expect(values[0].textContent).toEqual("Toyota");
    expect(values[1].textContent).toEqual("Toyota");
  });

  it("should get first row with given named cell value", async () => {
    render(<SimpleGridComponent sortCallbackFn={vi.fn} />);
    await waitForDataToHaveLoaded();
    const row = getFirstRowWithNamedCellValue("make", "Ford") as HTMLElement;
    expect(row?.firstChild?.textContent).toEqual("Ford");
    expect(row?.childNodes[1].textContent).toEqual("Mondeo");
    expect(row?.childNodes[2].textContent).toEqual("32000");
  });

  it("should get undefined if given named cell value is not exist", async () => {
    render(<SimpleGridComponent sortCallbackFn={vi.fn} />);
    await waitForDataToHaveLoaded();
    const row = getFirstRowWithNamedCellValue("make", "tesla");
    expect(row).toEqual(undefined);
  });

  const ui = (
    <div className="ag-root-wrapper">
      <div className="row">
        <span>container</span>
        <div>
          <div className="one">one</div>
          <div>two</div>
        </div>
      </div>
    </div>
  );

  it("should get first container element with class", () => {
    render(ui);
    const element = document.querySelector("div.one") as Element;
    const container = findFirstContainerElementWithClass(element, "row");
    expect(container?.firstChild?.textContent).toEqual("container");
  });

  it("should get first container element with class", () => {
    render(ui);
    const element = document.querySelector("div.one") as Element;
    const container = findFirstContainerElementWithClass(
      element,
      "not-exist-container"
    );
    expect(container).toBeFalsy();
  });

  it("should get page info when grid has pagination", async () => {
    const pageSetting = {
      pagination: true,
      paginationPageSize: 2,
    };
    render(
      <SimpleGridComponent
        {...pageSetting}
        rowData={[...gridData, ...gridData]}
        sortCallbackFn={vi.fn}
      />
    );
    const { lastRow, firstRow, rowCount } = await waitForPagination();
    expect(screen.getByText("Toyota")).toBeInTheDocument();
    expect(firstRow).toEqual("1");
    expect(lastRow).toEqual("2");
    expect(rowCount).toEqual("6");
  });

  it("should throw error if page has no pagination", async () => {
    render(<div className="paging-panel">no pagination</div>);
    try {
      await waitForPagination();
    } catch (e) {
      expect(e).not.toBeNull();
    }
  });
});
