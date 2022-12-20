import { AgGridReact } from "ag-grid-react";
import {
  columnDefsData,
  defaultColDefData,
  gridData,
  ICar,
} from "../../fixtures/GridFixture";

export function SimpleGridComponent({
  sortCallbackFn,
  rowData,
  ...restProps
}: {
  sortCallbackFn: () => void;
  rowData?: ICar[];
}) {
  return (
    <div>
      <AgGridReact
        {...restProps}
        rowData={rowData || gridData}
        onSortChanged={sortCallbackFn}
        columnDefs={columnDefsData}
        defaultColDef={defaultColDefData}
      />
    </div>
  );
}
