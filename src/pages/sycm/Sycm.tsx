import { useCallback, useMemo, useState } from "react";
import { SycmParser } from "./SycmParser";
import { AgGridReact } from "ag-grid-react";
import { Button } from "@mui/material";

export type SycmDataProps = {
  shopName: string;
  visitIndex: number;
  tradeIndex: number;
  cateTradeIndex: number;
  number: number;
};

export function Sycm() {
  const [rawData, setRawData] = useState("");
  const [rowData, setRowData] = useState<SycmDataProps[] | null>(null);

  const onParseData = useCallback(() => {
    const parser = new SycmParser();
    setRowData(parser.parse(rawData));
  }, [rawData]);

  const colDef = useMemo(
    () => [
      { field: "shopName", headerName: "店铺名称" },
      { field: "visitIndex", headerName: "流量指数" },
      { field: "tradeIndex", headerName: "交易指数" },
      { field: "cateTradeIndex", headerName: "交易指数（类目）" },
      { field: "number", headerName: "类目行业排名" },
    ],
    []
  );

  return (
    <div>
      <div>
        <textarea
          style={{ width: "600px", height: "200px" }}
          value={rawData}
          onChange={(e) => setRawData(e.target.value)}
        ></textarea>
      </div>
      <div>
        <Button variant="outlined" onClick={onParseData}>
          parse
        </Button>
      </div>
      <div className="ag-theme-material" style={{ height: 400, width: 1000 }}>
        <AgGridReact columnDefs={colDef} rowData={rowData} />
      </div>
    </div>
  );
}
