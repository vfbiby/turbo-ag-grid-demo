import { render } from "@testing-library/react";
import App from "../App";
import { waitForDataToHaveLoaded } from "./AgGridTestUtils";
import { clickHeaderSortIconOf } from "./GridUtils";

describe("AgGridTestUtils", () => {
  it.skip("should get column by name", async () => {
    render(<App />);
    await waitForDataToHaveLoaded();
    clickHeaderSortIconOf("Make");
  });
});
