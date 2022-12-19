import { getSortedColumns } from "./SortUtils";
import { SortChangedEvent } from "ag-grid-community";

describe("SortUtils", () => {
  it("should get one sorted column", () => {
    const event = generateEvent({
      gridColumns: [getMockColumn({ sorting: true })],
    });
    expect(getSortedColumns(event).length).toEqual(1);
  });

  it("should get two sorted columns", () => {
    const event = generateEvent({
      gridColumns: [
        getMockColumn({ sorting: true }),
        getMockColumn({ sorting: true }),
        getMockColumn({ sorting: false }),
      ],
    });
    expect(getSortedColumns(event).length).toEqual(2);
  });
});

function generateEvent({
  gridColumns,
}: {
  gridColumns: { isSorting: () => boolean }[];
}) {
  return {
    columnApi: {
      getAllGridColumns: () => gridColumns,
    },
  } as SortChangedEvent;
}

function getMockColumn({ sorting }: { sorting: boolean }) {
  return {
    isSorting: () => sorting,
  };
}
