import { render, waitFor } from "@testing-library/react";
import {
  clickSortIconOf,
  waitForDataToHaveLoaded,
} from "../../utils/AgGridTestUtils";
import { AgGridSelector } from "../../utils/AgGridSelector";
import { vi } from "vitest";
import { SortChangedEvent } from "ag-grid-community";
import { SimpleGridComponent } from "./GetSortedColumns";
import { formatSortedColumn, getSortedColumns } from "./SortUtils";

describe("GetSortedColumns", () => {
  let gridSelector: AgGridSelector;
  let sortEvent: SortChangedEvent;
  const sortCallback = vi
    .fn()
    .mockImplementation((event) => (sortEvent = event));

  async function setup() {
    render(<SimpleGridComponent sortCallbackFn={sortCallback} />);
    await waitForDataToHaveLoaded();
    gridSelector = new AgGridSelector();
  }

  beforeEach(async () => await setup());

  it("should call callback when click a sortable column's header", async () => {
    clickSortIconOf("Make");
    await waitFor(() => expect(sortCallback).toHaveBeenCalled());
  });

  it("should get the sorted column name when sorting", async () => {
    clickSortIconOf("Make");
    await waitFor(() =>
      expect(getSortedColumns(sortEvent)[0].getColId()).toEqual("make")
    );
  });

  it("should get the sorting is asc when clicked header once", async () => {
    clickSortIconOf("Make");
    await waitFor(() =>
      expect(getSortedColumns(sortEvent)[0].getSort()).toEqual("asc")
    );
  });

  it("should get the sorting is desc when clicked header twice", async () => {
    clickSortIconOf("Make");
    clickSortIconOf("Make");
    await waitFor(() =>
      expect(getSortedColumns(sortEvent)[0].getSort()).toEqual("desc")
    );
  });

  it("should get the formatted sorted columns", async () => {
    clickSortIconOf("Make");
    await waitFor(() =>
      expect(formatSortedColumn(getSortedColumns(sortEvent))).toEqual([
        { name: "make", order: "asc" },
      ])
    );
  });
});
