import { SycmParser } from "./SycmParser";

describe("Parser", () => {
  it("should parse a row data by space", () => {
    const row = "ASM ANNA 安娜 44,466 171,187 171,187 6 竞店分析";
    const parser = new SycmParser();
    expect(parser.parse(row).length).toEqual(1);
  });

  it("should parse out trade index from row", () => {
    const row = "ASM ANNA 安娜 44,466 171,187 171,187 6 竞店分析";
    const parser = new SycmParser();
    expect(parser.parse(row)[0].tradeIndex).toEqual(171187);
  });

  it("should parse out category trade index from row", () => {
    const row = " 南瓜谷NAGUAGU 43,235 131,569 130,994 16 竞店分析 ";
    const parser = new SycmParser();
    expect(parser.parse(row)[0].cateTradeIndex).toEqual(130994);
  });

  it("should parse out visit index from row", () => {
    const row = "ASM ANNA 安娜 44,466 171,187 171,187 6 竞店分析";
    const parser = new SycmParser();
    expect(parser.parse(row)[0].visitIndex).toEqual(44466);
  });

  it("should parse out what number the shop is from row", () => {
    const row = "ASM ANNA 安娜 44,466 171,187 171,187 6 竞店分析";
    const parser = new SycmParser();
    expect(parser.parse(row)[0].number).toEqual(6);
  });

  it("should parse out shop name with space from row", () => {
    const row = "ASM ANNA 安娜 44,466 171,187 171,187 6 竞店分析";
    const parser = new SycmParser();
    expect(parser.parse(row)[0].shopName).toEqual("ASM ANNA 安娜");
  });

  it("should parse out shop name with no space from row", () => {
    const row = "南瓜谷NAGUAGU 43,235 131,569 130,994 16 竞店分析 ";
    const parser = new SycmParser();
    expect(parser.parse(row)[0].shopName).toEqual("南瓜谷NAGUAGU");
  });

  it("should trim row", () => {
    const row = " 南瓜谷NAGUAGU 43,235 131,569 130,994 16 竞店分析 ";
    const parser = new SycmParser();
    expect(parser.parse(row)[0].shopName).toEqual("南瓜谷NAGUAGU");
  });

  it("should parse two row data", () => {
    const row =
      " 南瓜谷NAGUAGU 43,235 131,569 130,994 16 竞店分析\nASM ANNA 安娜 44,466 171,187 171,187 6 竞店分析";
    const parser = new SycmParser();
    expect(parser.parse(row)[0].shopName).toEqual("南瓜谷NAGUAGU");
    expect(parser.parse(row)[1].shopName).toEqual("ASM ANNA 安娜");
  });
});
