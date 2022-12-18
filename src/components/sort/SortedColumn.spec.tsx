import { render, screen } from "@testing-library/react";
import { SortedColumn } from "./SortedColumn";

describe("SortedColumn", () => {
  describe("Layout", () => {
    it("should show sorted column name", () => {
      render(<SortedColumn columns={[{ name: "make", order: "asc" }]} />);
      expect(screen.getByText("make")).toBeInTheDocument();
    });

    it("should show sorted order", () => {
      render(<SortedColumn columns={[{ name: "make", order: "asc" }]} />);
      expect(screen.getByText("asc")).toBeInTheDocument();
    });
  });
});
