import { render } from "@testing-library/react";
import App from "../App";
import { AgGridSelector } from "./AgGridSelector";
import { waitForDataToHaveLoaded } from "./AgGridTestUtils";

describe("AgGridSelector", () => {
  it("should get first row", async () => {
    render(<App />);
    await waitForDataToHaveLoaded();
    let selector = new AgGridSelector();
    expect(selector.getRowOf(0).getText()).toEqual("ToyotaCelica35000");
  });

  it("should get specified column value", async () => {
    render(<App />);
    await waitForDataToHaveLoaded();
    let selector = new AgGridSelector();
    expect(selector.getRowOf(1).getByColumn("Make").getText()).toEqual("Ford");
  });

  it("should get header of named", async () => {
    render(<App />);
    await waitForDataToHaveLoaded();
    let selector = new AgGridSelector();
    expect(selector.getHeaderOf("make").getText()).toEqual("Make");
  });

  it("should get sort icon of named header", async () => {
    render(<App />);
    await waitForDataToHaveLoaded();
    let selector = new AgGridSelector();
    expect(selector.getHeaderOf("make").getSortIcon()).toBeInTheDocument();
  });

  it("should throw error if sort icon of named header not exist", async () => {
    render(<App />);
    await waitForDataToHaveLoaded();
    let selector = new AgGridSelector();
    expect(() =>
      selector.getHeaderOf("not-exist-header").getSortIcon()
    ).toThrow(Error("sort icon not exist."));
  });

  it("should get filter icon of named header", async () => {
    render(<App />);
    await waitForDataToHaveLoaded();
    let selector = new AgGridSelector();
    expect(selector.getHeaderOf("make").getFilterIcon()).toBeInTheDocument();
  });

  it("should throw error if filter icon of named header not exist", async () => {
    render(<App />);
    await waitForDataToHaveLoaded();
    let selector = new AgGridSelector();
    expect(() =>
      selector.getHeaderOf("not-exist-header").getFilterIcon()
    ).toThrow(Error("filter icon not exist."));
  });
});
