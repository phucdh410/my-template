import { PropsWithChildren } from "react";

import { TColumnAligns, TColumnPins, THeaderTransform } from "../types";

export interface ICCellProps extends PropsWithChildren {
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
