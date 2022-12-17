import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import App from "./App";
import { vi } from "vitest";
import { SortChangedEvent } from "ag-grid-community";
import { clickColumnHeaderOf, getSortedColumns } from "./utils/GridUtils";
import { userEvent } from "@storybook/testing-library";
import {
  getRowCellNamed,
  getRowWithIndexIdCellNamed,
  headerColumnNamed,
  waitForDataToHaveLoaded,
  waitForGridToBeInTheDOM,
} from "./utils/AgGridTestUtils";
import assert from "node:assert/strict";

describe("Ag-grid", () => {
  describe("Layout", () => {
    it("should render table", () => {
      render(<App />);
      expect(screen.getByText("Make")).toBeInTheDocument();
    });

    it("should show data row", async () => {
      render(<App />);
      await waitForDataToHaveLoaded();
      expect(getRowCellNamed(0, "make")?.textContent).toEqual("Toyota");
      expect(getRowCellNamed(1, "make")?.textContent).toEqual("Ford");
    });
  });

  describe("sorting", () => {
    describe("get", () => {
      it("should be called when sorting", async () => {
        const filterFn = vi.fn();
        render(<App sortCallback={filterFn} />);
        clickColumnHeaderOf("Make");
        await waitFor(() => expect(filterFn).toBeCalled());
      });

      it("should get the sorted column name when sorting", async () => {
        let sortEvent: SortChangedEvent;
        const filterFn = vi
          .fn()
          .mockImplementation((event: SortChangedEvent) => (sortEvent = event));
        render(<App sortCallback={filterFn} />);
        clickColumnHeaderOf("Make");
        await waitFor(() =>
          expect(getSortedColumns(sortEvent)[0].getColId()).toEqual("make")
        );
      });

      it("should sort data when click column header", async () => {
        render(<App />);
        await waitForGridToBeInTheDOM();
        await waitForDataToHaveLoaded();
        fireEvent.click(screen.getByText("Model"));
        expect(screen.getByText("Sorted Column:")).toBeInTheDocument();
        await waitFor(() =>
          expect(screen.getByText("model")).toBeInTheDocument()
        );
      });
    });
  });

  describe("filtering", () => {
    function getHeaderFilterIcon(byText: string) {
      let element = document
        .querySelector(headerColumnNamed(byText))
        ?.querySelector("span.ag-icon-menu");
      assert(
        element !== null && element !== undefined,
        `Unable to find an header element with text ${byText}.`
      );
      return element;
    }

    it("should filter data", async () => {
      render(<App />);
      await waitForDataToHaveLoaded();
      expect(screen.queryByText("Celica")).toBeInTheDocument();
      userEvent.click(getHeaderFilterIcon("Model"));
      userEvent.type(screen.getAllByPlaceholderText("Filter...")[0], "Box");
      await waitFor(() =>
        expect(screen.queryByText("Celica")).not.toBeInTheDocument()
      );
      expect(getRowWithIndexIdCellNamed(0, "make")?.textContent).toEqual(
        "Porsche"
      );
    });
  });
});
