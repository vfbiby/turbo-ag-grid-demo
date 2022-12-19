import { render } from "@testing-library/react";
import App from "../App";
import { clickSortIconOf, waitForDataToHaveLoaded } from "./AgGridTestUtils";

describe("AgGridTestUtils", () => {
  it.skip("should get column by name", async () => {
    render(<App />);
    await waitForDataToHaveLoaded();
    clickSortIconOf("Make");
  });
});
