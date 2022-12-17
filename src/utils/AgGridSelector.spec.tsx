import { render } from "@testing-library/react";
import App from "../App";
import { AgGridSelector } from "./AgGridSelector";
import { waitForDataToHaveLoaded } from "./AgGridTestUtils";

describe("AgGridSelector", () => {
  let selector: AgGridSelector;

  async function setupAgGrid() {
    render(<App />);
    selector = new AgGridSelector();
    await waitForDataToHaveLoaded();
  }

  beforeEach(setupAgGrid);

  it("should get first row", async () => {
    expect(selector.getRowOf(0).getText()).toEqual("ToyotaCelica35000");
  });

  it("should get specified column value", async () => {
    expect(selector.getRowOf(1).getByColumn("Make").getText()).toEqual("Ford");
  });

  it("should get header of named", async () => {
    expect(selector.getHeaderOf("make").getText()).toEqual("Make");
  });

  it("should get sort icon of named header", async () => {
    expect(selector.getHeaderOf("make").getSortIcon()).toBeInTheDocument();
  });

  it("should throw error if sort icon of named header not exist", async () => {
    expect(() =>
      selector.getHeaderOf("not-exist-header").getSortIcon()
    ).toThrow(Error("sort icon not exist."));
  });

  it("should get filter icon of named header", async () => {
    expect(selector.getHeaderOf("make").getFilterIcon()).toBeInTheDocument();
  });

  it("should throw error if filter icon of named header not exist", async () => {
    expect(() =>
      selector.getHeaderOf("not-exist-header").getFilterIcon()
    ).toThrow(Error("filter icon not exist."));
  });
});
