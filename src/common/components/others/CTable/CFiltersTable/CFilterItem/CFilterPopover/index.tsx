import { memo, PropsWithChildren } from "react";

import { Popover } from "@mui/material";

interface ICFilterPopoverProps extends PropsWithChildren {
  anchorEl: HTMLElement | null;
  onClose: () => void;
}

const UnHOCComponent: React.FC<ICFilterPopoverProps> = ({
  children,
  anchorEl,
  onClose,
}) => {
  //#region Render
  return (
    <Popover
      open={!!anchorEl}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
      transformOrigin={{ horizontal: "left", vertical: "top" }}
      className="c-filter-table--popover"
    >
      {children}
    </Popover>
  );
};
//#endregion

export const CFilterPopover = memo(UnHOCComponent);
