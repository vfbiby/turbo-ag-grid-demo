import { render, screen, within } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  it("render app", () => {
    render(<App />);
    expect(screen.getByText("Make")).toBeInTheDocument();
  });

  function gridDataRowOf(row: number = 1) {
    return within(screen.getAllByRole("rowgroup")[2]).getAllByRole("row")[
      row - 1
    ];
  }

  it("should show data row", () => {
    render(<App />);
    expect(
      within(gridDataRowOf(1)).getAllByRole("gridcell")[0]
    ).toHaveTextContent("Toyota");
    expect(
      within(gridDataRowOf(1)).getByRole(
        (role, element) =>
          role === "gridcell" && element?.getAttribute("col-id") === "price"
      )
    ).toHaveTextContent("35000");
    expect(screen.getByText("Porsche")).toBeInTheDocument();
  });
});
