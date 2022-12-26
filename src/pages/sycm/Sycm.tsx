import React, { useCallback, useMemo, useState } from "react";
import { SycmParser } from "./SycmParser";
import { AgGridReact } from "ag-grid-react";
import {
  Box,
  Button,
  createTheme,
  CssBaseline,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextareaAutosize,
  ThemeProvider,
} from "@mui/material";
import {
  Menu,
  MenuItem,
  Sidebar,
  SubMenu,
  useProSidebar,
} from "react-pro-sidebar";
import {
  AccountBalanceOutlined,
  AcUnitOutlined,
  CalendarMonthOutlined,
  DehazeOutlined,
  PieChartOutlineOutlined,
  ShowChartOutlined,
} from "@mui/icons-material";

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
  const darkTheme = createTheme({
    palette: {
      mode: "light",
    },
  });
  const { collapseSidebar } = useProSidebar();

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
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box display="flex">
        <Box>
          <Sidebar style={{ height: "100vh" }}>
            <Menu>
              <SubMenu label="Charts" icon={<AcUnitOutlined />}>
                <MenuItem icon={<PieChartOutlineOutlined />}>
                  Pie charts
                </MenuItem>
                <MenuItem icon={<ShowChartOutlined />}>Line charts</MenuItem>
              </SubMenu>
              <MenuItem icon={<AccountBalanceOutlined />}>
                Documentation
              </MenuItem>
              <MenuItem icon={<CalendarMonthOutlined />}> Calendar </MenuItem>
            </Menu>
          </Sidebar>
        </Box>
        <Box>
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

          <Stack
            m={1}
            direction="row"
            justifyContent="space-between"
            spacing={1}
          >
            <Box justifyContent="flex-start">
              <IconButton onClick={() => collapseSidebar()}>
                <DehazeOutlined />
              </IconButton>
            </Box>
            <Box>
              <Button
                sx={{
                  mx: 1,
                }}
                color="warning"
                variant="outlined"
                onClick={() => setIsOpen(true)}
              >
                paste
              </Button>
              <Button variant="contained" onClick={onParseData}>
                parse
              </Button>
            </Box>
          </Stack>
          <Box
            borderRadius={2}
            overflow="hidden"
            className="ag-theme-material"
            style={{ height: "80vh", width: "100vh" }}
          >
            <AgGridReact columnDefs={colDef} rowData={rowData} />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
