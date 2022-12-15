import { useMemo, useState } from "react";
import "./App.css";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/styles/ag-grid.min.css";
import "ag-grid-community/styles/ag-theme-material.min.css";

interface AppProps {
  sortCallback?: () => void;
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

  return (
    <div className="App">
      <div className="ag-theme-material" style={{ height: 400, width: 600 }}>
        <AgGridReact
          onSortChanged={sortCallback}
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
