import { useCallback, useMemo, useState } from "react";
import "./App.css";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/styles/ag-grid.min.css";
import "ag-grid-community/styles/ag-theme-material.min.css";
import { Column, SortChangedEvent } from "ag-grid-community";

interface AppProps {
  sortCallback?: (event: SortChangedEvent) => void;
}

function App({ sortCallback }: AppProps) {
  const [rowData] = useState([
    { make: "Toyota", model: "Celica", price: 35000 },
    { make: "Ford", model: "Mondeo", price: 32000 },
    { make: "Porsche", model: "Boxster", price: 72000 },
  ]);

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
    }),
    []
  );

  const [columnDefs] = useState([
    { field: "make" },
    { field: "model" },
    { field: "price" },
  ]);

  const [sortedColumns, setSortedColumns] = useState<Column[] | undefined>();

  const onSortChange = useCallback((event: SortChangedEvent) => {
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
          onSortChanged={onSortChange}
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
