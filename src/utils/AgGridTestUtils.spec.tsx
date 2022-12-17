import { render, waitFor } from "@testing-library/react";
import App from "../App";
import { getRowCellNamed, waitForDataToHaveLoaded } from "./AgGridTestUtils";
import { clickHeaderOf } from "./GridUtils";

describe("AgGridTestUtils", () => {
  it("should get column by name", async () => {
    render(<App />);
    await waitForDataToHaveLoaded();
    clickHeaderOf("Make");
    await waitFor(() =>
      expect(getRowCellNamed(0, "make")?.textContent).toEqual("Ford")
    );
  });
});
