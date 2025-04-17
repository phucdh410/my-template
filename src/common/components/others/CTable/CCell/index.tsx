import { memo, PropsWithChildren } from "react";

import { TableCell } from "@mui/material";
import classNames from "classnames";

import { TColumnAligns, TColumnPins, THeaderTransform } from "../types";

interface ICCellProps extends PropsWithChildren {
  align?: TColumnAligns;
  className?: string;
  pin?: TColumnPins;
  headerKey: string;
  isHeader?: boolean;
  headerTransform?: THeaderTransform;
  pinPositions?: {
    left: Record<string, string>;
    right: Record<string, string>;
    leftLastKey: string;
    rightFirstKey: string;
  } | null;
  selectable?: boolean;
}

const Cell = ({
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

export const CTableCell = memo(Cell);
