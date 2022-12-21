export class SycmParser {
  parse(row: string) {
    const parsedRows = [];
    const allRows = row.split("\n");
    for (let row of allRows) {
      const rowData = row.trim().split(" ");
      const length = rowData.length;
      const newRow = {
        shopName: rowData.slice(0, length - 5).join(" "),
        visitIndex: SycmParser.toNumber(rowData[length - 5]),
        tradeIndex: SycmParser.toNumber(rowData[length - 4]),
        cateTradeIndex: SycmParser.toNumber(rowData[length - 3]),
        number: SycmParser.toNumber(rowData[length - 2]),
      };
      parsedRows.push(newRow);
    }
    return parsedRows;
  }

  static toNumber(string: string) {
    return Number(string.split(",").join(""));
  }
}
