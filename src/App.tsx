import { useCallback, useMemo, useState } from "react";
import "./App.css";
import { AgGridReact } from "ag-grid-react";

import { Column, SortChangedEvent } from "ag-grid-community";
import {
  columnDefsData,
  defaultColDefData,
  gridData,
  ICar,
} from "./fixtures/GridFixture";

interface AppProps {
  sortCallback?: (event: SortChangedEvent) => void;
}

function App({ sortCallback }: AppProps) {
  const [rowData] = useState<ICar[]>(gridData);

  const defaultColDef = useMemo(() => defaultColDefData, []);

  const [columnDefs] = useState(columnDefsData);

  const [sortedColumns, setSortedColumns] = useState<Column[] | undefined>();

  const onSortChanged = useCallback((event: SortChangedEvent) => {
    setSortedColumns(
      event.columnApi.getAllGridColumns().filter((col) => col.isSorting())
    );
    sortCallback?.(event);
  }, []);

  return (
    <div className="App">
      <div>
        <span>Sorted Column: </span>
        {sortedColumns?.map((col) => (
          <span>{col.getColId()}</span>
        ))}
      </div>
      <div className="ag-theme-material" style={{ height: 400, width: 600 }}>
        <AgGridReact
          onSortChanged={onSortChanged}
          defaultColDef={defaultColDef}
          rowData={rowData}
          columnDefs={columnDefs}
        ></AgGridReact>
      </div>
      <span>just go to bed</span>
    </div>
  );
}

export default App;
