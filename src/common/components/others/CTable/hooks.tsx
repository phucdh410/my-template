import { RefObject, useEffect, useMemo, useState } from "react";

import { ICTableProps } from "./types";
import { SELECTION_COL_KEY, SELECTION_COL_WIDTH } from "./variables";

//#region Handle shadow when table scroll
export const useTableScrollShadow = (
  tableWrapperRef: RefObject<HTMLDivElement | null>,
  bodyContainerRef: RefObject<HTMLDivElement | null>
) => {
  useEffect(() => {
    if (!bodyContainerRef.current || !tableWrapperRef.current) return;
    const bodyContainer = bodyContainerRef.current;
    const tableWrapper = tableWrapperRef.current;

    const handleTableScroll = () => {
      const { scrollWidth, clientWidth, scrollLeft } = bodyContainer;

      if (scrollLeft === 0) {
        tableWrapper.classList.remove("left-pin-shadow");
      }
      if (scrollLeft > 0) {
        tableWrapper.classList.add("left-pin-shadow", "right-pin-shadow");
      }
      if (scrollLeft + clientWidth === scrollWidth) {
        tableWrapper.classList.remove("right-pin-shadow");
      }
    };

    const { scrollWidth, clientWidth } = bodyContainer;

    if (scrollWidth > clientWidth) {
      tableWrapper.classList.add("right-pin-shadow");
    }
    bodyContainer.addEventListener("scroll", handleTableScroll);

    return () => bodyContainer.removeEventListener("scroll", handleTableScroll);
  }, [bodyContainerRef, tableWrapperRef]);
};
//#endregion

//#region Check table has scrollbars or not
export const useDetectScrollbar = (
  bodyContainerRef: RefObject<HTMLDivElement | null>
) => {
  const [hasVertical, setHasVertical] = useState(false);
  const [hasHorizontal, setHasHorizontal] = useState(false);

  useEffect(() => {
    if (!bodyContainerRef.current) return;
    const el = bodyContainerRef.current;

    const checkScrollbars = () => {
      setHasHorizontal(el.scrollWidth > el.clientWidth);
      setHasVertical(el.scrollHeight > el.clientHeight);
    };

    checkScrollbars();
    window.addEventListener("resize", checkScrollbars);
    return () => window.removeEventListener("resize", checkScrollbars);
  }, []);

  return { hasVertical, hasHorizontal };
};
//#endregion

//#region Calculate pin positions for columns
export const useCalculatePinPositions = <T extends object>(
  headers: ICTableProps<T>["columns"],
  selectable?: boolean
) => {
  const pinPositions = useMemo(() => {
    if (!headers.some((header) => header.pin) && !selectable) return null;

    let leftOffset = 0;
    const left: Record<string, string> = {};
    let leftLastKey = "";

    let rightOffset = 0;
    const right: Record<string, string> = {};
    let rightFirstKey = "";

    if (selectable) {
      left[SELECTION_COL_KEY] = "0px";
      leftOffset += SELECTION_COL_WIDTH;
      leftLastKey = SELECTION_COL_KEY;
    }

    headers.forEach((header, index) => {
      if (header.pin === "left") {
        left[header.key] = `${leftOffset}px`;
        leftOffset += header.width;
        leftLastKey = header.key;
      } else if (header.pin === "right") {
        if (!rightFirstKey) rightFirstKey = header.key;
        right[header.key] = `${rightOffset}px`;
        rightOffset += header.width;
      }
    });

    return { left, right, leftLastKey, rightFirstKey };
  }, [headers, selectable]);

  return { pinPositions };
};
//#endregion

//#region Calculate columns width
export const useTableColumnsWidth = (
  headerContainerRef: RefObject<HTMLDivElement | null>,
  tableRef: RefObject<HTMLTableElement | null>,
  data: any //note: Ta chỉ cần biết data thay đổi để cập nhật lại width, nên không quan trọng dữ liệu nó loại gì
) => {
  const [widthCols, setWidthCols] = useState<number[]>([]);

  useEffect(() => {
    if (!tableRef.current || !headerContainerRef.current) return;
    const headerContainer = headerContainerRef.current;
    const table = tableRef.current;

    const headerRow = headerContainer.querySelector("table thead tr");
    const firstRow = table.querySelector("tbody tr");

    if (firstRow && headerRow) {
      const newWidths: number[] = [];
      const headerColumns = headerRow.querySelectorAll("th");
      const bodyColumns = firstRow.querySelectorAll("td");

      headerColumns.forEach((e, i) => {
        if (
          e.classList.contains("scrollbar-cell") ||
          e.classList.contains("selection-cell")
        )
          return;
        const headerWidth = e.getBoundingClientRect().width;
        const bodyWidht = bodyColumns[i].getBoundingClientRect().width;
        newWidths.push(Math.max(headerWidth, bodyWidht));
      });

      setWidthCols(newWidths);
    }
  }, [data]);

  return { widthCols };
};
//#endregion
