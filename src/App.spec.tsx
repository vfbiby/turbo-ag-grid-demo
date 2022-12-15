import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import App from "./App";
import { vi } from "vitest";
import { SortChangedEvent } from "ag-grid-community";

describe("App", () => {
  it("render app", () => {
    render(<App />);
    expect(screen.getByText("Make")).toBeInTheDocument();
  });

  function gridDataRowOf(row: number = 1) {
    return within(screen.getAllByRole("rowgroup")[2]).getAllByRole("row")[
      row - 1
    ];
  }

  it("should show data row", () => {
    render(<App />);
    expect(
      within(gridDataRowOf(1)).getAllByRole("gridcell")[0]
    ).toHaveTextContent("Toyota");
    expect(
      within(gridDataRowOf(1)).getByRole(
        (role, element) =>
          role === "gridcell" && element?.getAttribute("col-id") === "price"
      )
    ).toHaveTextContent("35000");
    expect(screen.getByText("Porsche")).toBeInTheDocument();
  });

  const clickSortIcon = (byText: string) => {
    fireEvent.click(screen.getByText(byText));
  };

  it("should be called when sorting", async () => {
    const filterFn = vi.fn();
    render(<App sortCallback={filterFn} />);
    clickSortIcon("Make");
    await waitFor(() => expect(filterFn).toBeCalled());
  });

  const getSortedColumn = (sortEvent: SortChangedEvent) => {
    return sortEvent.columnApi
      .getAllGridColumns()
      .filter((col) => col.isSorting())[0];
  };

  it("should get the filtered column name when sorting", async () => {
    let sortEvent: SortChangedEvent;
    const filterFn = vi
      .fn()
      .mockImplementation((event: SortChangedEvent) => (sortEvent = event));
    render(<App sortCallback={filterFn} />);
    clickSortIcon("Make");
    await waitFor(() =>
      expect(getSortedColumn(sortEvent).getColId()).toEqual("make")
    );
  });
});
