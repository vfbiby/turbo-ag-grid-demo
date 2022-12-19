import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import App from "./App";
import { userEvent } from "@storybook/testing-library";
import {
  waitForDataToHaveLoaded,
  waitForGridToBeInTheDOM,
} from "./utils/AgGridTestUtils";
import { AgGridSelector } from "./utils/AgGridSelector";

describe("Ag-grid", () => {
  describe("Layout", () => {
    it("should render table", () => {
      render(<App />);
      expect(screen.getByText("Make")).toBeInTheDocument();
    });

    it("should show data row", async () => {
      render(<App />);
      let gridSelector = new AgGridSelector();
      await waitForDataToHaveLoaded();
      expect(gridSelector.getRowOf(0).getByColumn("make").getText()).toEqual(
        "Toyota"
      );
      expect(gridSelector.getRowOf(1).getByColumn("make").getText()).toEqual(
        "Ford"
      );
    });
  });

  describe("sorting", () => {
    it("should show sorted column when click column header", async () => {
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

  describe("filtering", () => {
    it("should filter data", async () => {
      render(<App />);
      await waitForDataToHaveLoaded();
      let gridSelector = new AgGridSelector();
      expect(screen.queryByText("Celica")).toBeInTheDocument();
      userEvent.click(gridSelector.getHeaderOf("Model").getFilterIcon());
      userEvent.type(screen.getAllByPlaceholderText("Filter...")[0], "Box");
      await waitFor(() =>
        expect(screen.queryByText("Celica")).not.toBeInTheDocument()
      );
      expect(gridSelector.getRowOf(0).getByColumn("Make").getText()).toEqual(
        "Porsche"
      );
    });
  });
});
