import { render, waitFor } from "@testing-library/react";
import App from "../App";
import {
  getRowWithIndexIdCellNamed,
  waitForDataToHaveLoaded,
} from "./AgGridTestUtils";
import { clickColumnHeaderOf } from "./GridUtils";

describe("AgGridTestUtils", () => {
  it("should get column by name", async () => {
    render(<App />);
    await waitForDataToHaveLoaded();
    clickColumnHeaderOf("Make");
    await waitFor(() =>
      expect(getRowWithIndexIdCellNamed(0, "make")?.textContent).toEqual("Ford")
    );
  });
});
