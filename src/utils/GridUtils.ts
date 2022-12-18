import { fireEvent } from "@testing-library/react";
import { AgGridSelector } from "./AgGridSelector";

export const clickHeaderSortIconOf = (byText: string) => {
  let gridSelector = new AgGridSelector();
  fireEvent.click(gridSelector.getHeaderOf(byText).getSortIcon());
};
