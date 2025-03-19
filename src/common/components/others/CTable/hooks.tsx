import { RefObject, useEffect, useMemo, useState } from "react";

import { TCHeadersTable } from "./types";

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
  headers: TCHeadersTable<T>
) => {
  const pinPositions = useMemo(() => {
    if (!headers.some((header) => header.pin)) return null;
    let leftOffset = 0;
    const left: Record<string, string> = {};
    let leftLastKey = "";

    let rightOffset = 0;
    const right: Record<string, string> = {};
    let rightFirstKey = "";

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
  }, [headers]);

  return { pinPositions };
};
//#endregion

//#region Calculate columns width
export const useTableColumnsWidth = (
  headerContainerRef: RefObject<HTMLDivElement | null>,
  tableRef: RefObject<HTMLTableElement | null>
) => {
  const [widthCols, setWidthCols] = useState<number[]>([]);

  useEffect(() => {
    if (!tableRef.current || !headerContainerRef.current) return;
    const headerContainer = headerContainerRef.current;
    const table = tableRef.current;

    const observer = new ResizeObserver(() => {
      const headerRow = headerContainer.querySelector("table thead tr");
      const firstRow = table.querySelector("tbody tr");

      if (firstRow && headerRow) {
        const newWidths: number[] = [];
        const headerColumns = headerRow.querySelectorAll("th");
        const bodyColumns = firstRow.querySelectorAll("td");

        for (let i = 0; i < bodyColumns.length; i++) {
          const headerCellWidth =
            headerColumns[i].getBoundingClientRect().width;
          const bodyCellWidth = bodyColumns[i].getBoundingClientRect().width;
          newWidths.push(Math.max(headerCellWidth, bodyCellWidth));
        }
        setWidthCols(newWidths);
      }
    });

    observer.observe(table);

    return () => observer.disconnect();
  }, []);

  return { widthCols };
};
//#endregion
