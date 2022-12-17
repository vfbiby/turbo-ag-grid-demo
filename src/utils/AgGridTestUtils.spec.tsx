import { render, waitFor } from "@testing-library/react";
import App from "../App";
import {
  columnNamed,
  getRowCellNamed,
  waitForDataToHaveLoaded,
} from "./AgGridTestUtils";
import { clickColumnHeaderOf } from "./GridUtils";

describe("AgGridTestUtils", () => {
  const rowWithIndexId = (indexId: number) => {
    return `.ag-row[row-index="${indexId}"]`;
  };

  function getRowCellNamedWithIndexId(indexId: number, cellName: string) {
    return document.querySelector(
      rowWithIndexId(indexId) + " " + columnNamed(cellName)
    );
  }

  it("should get column by name", async () => {
    render(<App />);
    await waitForDataToHaveLoaded();
    clickColumnHeaderOf("Make");
    await waitFor(() =>
      expect(getRowCellNamedWithIndexId(0, "make")?.textContent).toEqual("Ford")
    );
  });
});
