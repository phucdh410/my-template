import { TableCell } from "@mui/material";
import classNames from "classnames";

import { ICCellProps } from "./types";

export const CTableCell = ({
  align = "center",
  className,
  pin,
  headerKey,
  isHeader = false,
  headerTransform,
  pinPositions,
  children,
  selectable,
}: ICCellProps) => {
  return (
    <TableCell
      align={align}
      scope={isHeader ? "col" : undefined}
      className={classNames(
        `c-table-${isHeader ? "head" : "body"}--cell`,
        className,
        selectable && "selection-cell",
        {
          "pin-left": pin === "left",
          "pin-right": pin === "right",
          "pin-left-last":
            pin === "left" && headerKey === pinPositions?.leftLastKey,
          "pin-right-first":
            pin === "right" && headerKey === pinPositions?.rightFirstKey,
        }
      )}
      style={{
        ...(isHeader && {
          textTransform: headerTransform ? headerTransform : "none",
        }),
        position: pin ? "sticky" : undefined,
        zIndex: (pin ? 2 : 1) + (isHeader ? 2 : 0),
        ...(pin && pin === "left"
          ? { left: pinPositions?.left[headerKey] }
          : { right: pinPositions?.right[headerKey] }),
      }}
    >
      {children}
    </TableCell>
  );
};
