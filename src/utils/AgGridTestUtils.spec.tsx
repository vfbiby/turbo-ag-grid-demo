import {
  clickFilterIconOf,
  clickSortIconOf,
  radioOperatorOf,
} from "./AgGridTestUtils";
import { fireEvent, render, screen } from "@testing-library/react";
import { SimpleGridComponent } from "../components/sort/GetSortedColumns";
import { vi } from "vitest";

describe("AgGridTestUtils", () => {
  it("should click filter icon of make", () => {
    vi.spyOn(fireEvent, "click");
    render(<SimpleGridComponent sortCallbackFn={vi.fn} />);
    clickFilterIconOf("make");
    expect(fireEvent.click).toBeCalled();
  });

  it("should get specified radio", async () => {
    render(<SimpleGridComponent sortCallbackFn={vi.fn} />);
    clickFilterIconOf("make");
    expect(radioOperatorOf("or")).toBeInTheDocument();
  });

  it("should click sort icon", async () => {
    vi.spyOn(fireEvent, "click");
    render(<SimpleGridComponent sortCallbackFn={vi.fn} />);
    clickSortIconOf("make");
    expect(fireEvent.click).toBeCalled();
  });
});
