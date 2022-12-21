import { useCallback, useMemo, useState } from "react";
import { SycmParser } from "./SycmParser";
import { AgGridReact } from "ag-grid-react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextareaAutosize,
} from "@mui/material";

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
  const [isOpen, setIsOpen] = useState(false);

  const onParseData = useCallback(() => {
    const parser = new SycmParser();
    setRowData(parser.parse(rawData));
    setIsOpen(false);
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
        {isOpen && (
          <Dialog open={isOpen}>
            <DialogTitle>Paste data to parse</DialogTitle>
            <DialogContent>
              <TextareaAutosize
                style={{ width: "500px" }}
                minRows={10}
                value={rawData}
                onChange={(e) => setRawData(e.target.value)}
              />
            </DialogContent>
            <DialogActions>
              <Button variant="contained" onClick={onParseData}>
                parse
              </Button>
            </DialogActions>
          </Dialog>
        )}
      </div>
      <div>
        <Button variant="outlined" onClick={() => setIsOpen(true)}>
          paste
        </Button>
        <Button variant="contained" onClick={onParseData}>
          parse
        </Button>
      </div>
      <div className="ag-theme-material" style={{ height: 400, width: 1000 }}>
        <AgGridReact columnDefs={colDef} rowData={rowData} />
      </div>
    </div>
  );
}
