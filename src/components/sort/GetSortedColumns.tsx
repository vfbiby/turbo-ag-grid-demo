import { AgGridReact } from "ag-grid-react";
import {
  columnDefsData,
  defaultColDefData,
  gridData,
} from "../../fixtures/GridFixture";

export function SimpleGridComponent({
  sortCallbackFn,
}: {
  sortCallbackFn: () => void;
}) {
  return (
    <div>
      <AgGridReact
        rowData={gridData}
        onSortChanged={sortCallbackFn}
        columnDefs={columnDefsData}
        defaultColDef={defaultColDefData}
      />
    </div>
  );
}
