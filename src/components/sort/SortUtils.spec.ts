import { formatSortedColumn, getSortedColumns } from "./SortUtils";
import { SortChangedEvent } from "ag-grid-community";

describe("SortUtils", () => {
  describe("GetSortedColumns", () => {
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

    it("should get sorted column's name", () => {
      const event = generateEvent({
        gridColumns: [getMockColumn({ colId: "make" })],
      });
      expect(getSortedColumns(event)[0].getColId()).toEqual("make");
    });

    it("should get sorted column's order", () => {
      const event = generateEvent({
        gridColumns: [getMockColumn({ order: "desc" })],
      });
      expect(getSortedColumns(event)[0].getSort()).toEqual("desc");
    });
  });

  describe("FormatSortedColumns", () => {
    it("should format one sorted columns", () => {
      const event = generateEvent({
        gridColumns: [getMockColumn({ colId: "model", order: "desc" })],
      });
      expect(formatSortedColumn(getSortedColumns(event))).toEqual([
        {
          name: "model",
          order: "desc",
        },
      ]);
    });

    it("should format two sorted columns", () => {
      const event = generateEvent({
        gridColumns: [
          getMockColumn({ colId: "model", order: "desc" }),
          getMockColumn({ colId: "make" }),
        ],
      });
      expect(formatSortedColumn(getSortedColumns(event))).toEqual([
        {
          name: "model",
          order: "desc",
        },
        {
          name: "make",
          order: "asc",
        },
      ]);
    });
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

function getMockColumn({
  sorting = true,
  colId = "make",
  order = "asc",
}: {
  sorting?: boolean;
  colId?: string;
  order?: string;
}) {
  return {
    isSorting: () => sorting,
    getColId: () => colId,
    getSort: () => order,
  };
}
