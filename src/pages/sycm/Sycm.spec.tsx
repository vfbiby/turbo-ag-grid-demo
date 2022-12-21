import { render, screen } from "@testing-library/react";
import { userEvent } from "@storybook/testing-library";
import { Sycm } from "./Sycm";
import { waitForDataToHaveLoaded } from "../../utils/AgGridTestUtils";
import { AgGridSelector } from "../../utils/AgGridSelector";

describe("Sycm page", () => {
  describe("Layout", () => {
    it("should show paste data button", () => {
      render(<Sycm />);
      expect(screen.getByRole("button", { name: "paste" })).toBeInTheDocument();
    });

    it("should show parse button", () => {
      render(<Sycm />);
      expect(screen.getByRole("button", { name: "parse" })).toBeInTheDocument();
    });

    it("should show column name shopName", () => {
      render(<Sycm />);
      expect(screen.getByText("店铺名称")).toBeInTheDocument();
    });

    it("should show column name visitIndex", () => {
      render(<Sycm />);
      expect(screen.getByText("流量指数")).toBeInTheDocument();
    });

    it("should show column name tradeIndex", () => {
      render(<Sycm />);
      expect(screen.getByText("交易指数")).toBeInTheDocument();
    });

    it("should show column name cateTradeIndex", () => {
      render(<Sycm />);
      expect(screen.getByText("交易指数（类目）")).toBeInTheDocument();
    });

    it("should show column name number", () => {
      render(<Sycm />);
      expect(screen.getByText("类目行业排名")).toBeInTheDocument();
    });
  });

  describe("Interactions", () => {
    it("should show textarea when click paste button", async () => {
      render(<Sycm />);
      userEvent.click(screen.getByRole("button", { name: "paste" }));
      expect(screen.getByRole("textbox")).toBeInTheDocument();
    });

    it("should set textarea data to state", () => {
      render(<Sycm />);
      userEvent.click(screen.getByRole("button", { name: "paste" }));
      userEvent.paste(screen.getByRole("textbox"), "Hello");
      expect(screen.getByRole("textbox")).toHaveValue("Hello");
    });

    it("should show parsed data when pasted and click parse button", async () => {
      render(<Sycm />);
      const data =
        " 南瓜谷NAGUAGU 43,235 131,569 130,994 16 竞店分析\nASM ANNA 安娜 44,466 171,187 171,187 6 竞店分析";
      userEvent.click(screen.getByRole("button", { name: "paste" }));
      userEvent.paste(screen.getByRole("textbox"), data);
      userEvent.click(screen.getByRole("button", { name: "parse" }));
      await waitForDataToHaveLoaded();
      const gridSelector = new AgGridSelector();
      expect(gridSelector.getRowOf(0).getText()).toEqual(
        "南瓜谷NAGUAGU4323513156913099416"
      );
    });
  });
});
