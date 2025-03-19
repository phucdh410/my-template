import { RefObject, useEffect, useMemo, useState } from "react";

import { TCHeadersTable } from "./types";

//#region Handle shadow when table scroll
export const useTableScrollShadow = (
  bodyContainerRef: RefObject<HTMLDivElement | null>,
  tableRef: RefObject<HTMLTableElement | null>
) => {
  useEffect(() => {
    const handleTableScroll = () => {
      if (bodyContainerRef.current && tableRef.current) {
        const { scrollWidth, clientWidth, scrollLeft } =
          bodyContainerRef.current;

        if (scrollLeft === 0) {
          tableRef.current.classList.remove("left-pin-shadow");
        }
        if (scrollLeft > 0) {
          tableRef.current.classList.add("left-pin-shadow", "right-pin-shadow");
        }
        if (scrollLeft + clientWidth === scrollWidth) {
          tableRef.current.classList.remove("right-pin-shadow");
        }
      }
    };

    if (bodyContainerRef.current && tableRef.current) {
      const { scrollWidth, clientWidth } = bodyContainerRef.current;

      if (scrollWidth > clientWidth) {
        tableRef.current.classList.add("right-pin-shadow");
      }
      bodyContainerRef.current.addEventListener("scroll", handleTableScroll);
    }

    return () => {
      if (bodyContainerRef.current) {
        bodyContainerRef.current.removeEventListener(
          "scroll",
          handleTableScroll
        );
      }
    };
  }, [bodyContainerRef, tableRef]);
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

//#region Get pin positions for columns
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
