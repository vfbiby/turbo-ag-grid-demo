import { render, screen, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import { AgGridReact } from "ag-grid-react";
import {
  columnDefsData,
  defaultColDefData,
  gridData,
  ICar,
} from "../../fixtures/GridFixture";
import { FilterChangedEvent } from "ag-grid-community";
import { userEvent } from "@storybook/testing-library";
import {
  clickFilterIconOf,
  radioOperatorOf,
  waitForDataToHaveLoaded,
} from "../../utils/AgGridTestUtils";

function SimpleFilterGrid({ onFilterChange }: { onFilterChange: () => void }) {
  return (
    <div>
      <AgGridReact
        rowData={gridData}
        onFilterChanged={onFilterChange}
        defaultColDef={defaultColDefData}
        columnDefs={columnDefsData}
      />
    </div>
  );
}

describe("GetFilteredColumns", () => {
  beforeEach(async () => await setup());

  // @ts-ignore
  afterEach(() => (filterEvent = undefined));

  let filterEvent: FilterChangedEvent<ICar>;
  let filterCallback = vi
    .fn()
    .mockImplementation((event) => (filterEvent = event));

  it("should call callback when filtering", async () => {
    clickFilterIconOf("Model");
    userEvent.type(screen.getAllByPlaceholderText("Filter...")[0], "Box");
    await waitFor(() => expect(filterCallback).toBeCalled());
  });

  it("should get one filter when filtering on one column", async () => {
    await setup();
    clickFilterIconOf("Model");
    await userEvent.type(screen.getAllByPlaceholderText("Filter...")[0], "Box");
    await waitFor(() => {
      expect(getFilteredColumns<ICar>(filterEvent).model).toEqual({
        filter: "Box",
        filterType: "text",
        type: "contains",
      });
    });
  });

  it("should get one filter with and condition when filtering on one column and", async () => {
    clickFilterIconOf("Model");
    await userEvent.type(screen.getAllByPlaceholderText("Filter...")[0], "Box");
    await userEvent.type(screen.getAllByPlaceholderText("Filter...")[1], "C");
    await waitFor(() => {
      expect(getFilteredColumns<ICar>(filterEvent).model).toEqual(
        expectedObj("AND")
      );
    });
  });

  it("should get one filter with or condition when filtering on one column or", async () => {
    clickFilterIconOf("Model");
    await userEvent.type(screen.getAllByPlaceholderText("Filter...")[0], "Box");
    await userEvent.click(radioOperatorOf("or") as HTMLElement);
    await userEvent.type(screen.getAllByPlaceholderText("Filter...")[1], "C");
    await waitFor(() => {
      expect(getFilteredColumns<ICar>(filterEvent).model).toEqual(
        expectedObj("OR")
      );
    });
  });

  const condition1 = {
    filter: "Box",
    filterType: "text",
    type: "contains",
  };

  const condition2 = {
    filter: "C",
    filterType: "text",
    type: "contains",
  };

  function expectedObj(operator: string) {
    return {
      condition1,
      condition2,
      filterType: "text",
      operator: operator,
    };
  }

  function getFilteredColumns<T>(filterEvent: FilterChangedEvent<T>) {
    return filterEvent.api.getFilterModel() as {
      [p in keyof T]: any;
    };
  }

  async function setup() {
    render(<SimpleFilterGrid onFilterChange={filterCallback} />);
    await waitForDataToHaveLoaded();
  }
});
