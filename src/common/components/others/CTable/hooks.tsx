import { RefObject, useEffect } from "react";

export const useTableScrollShadow = (
  tableContainerRef: RefObject<HTMLDivElement | null>,
  tableRef: RefObject<HTMLTableElement | null>
) => {
  useEffect(() => {
    const handleTableScroll = () => {
      if (tableContainerRef.current && tableRef.current) {
        const { scrollWidth, clientWidth, scrollLeft } =
          tableContainerRef.current;

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

    if (tableContainerRef.current && tableRef.current) {
      const { scrollWidth, clientWidth } = tableContainerRef.current;

      if (scrollWidth > clientWidth) {
        tableRef.current.classList.add("right-pin-shadow");
      }
      tableContainerRef.current.addEventListener("scroll", handleTableScroll);
    }

    return () => {
      if (tableContainerRef.current) {
        tableContainerRef.current.removeEventListener(
          "scroll",
          handleTableScroll
        );
      }
    };
  }, [tableContainerRef, tableRef]);
};
