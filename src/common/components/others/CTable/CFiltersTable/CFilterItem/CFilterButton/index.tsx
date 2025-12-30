import { PropsWithChildren } from "react";

import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";
import { Button } from "@mui/material";

interface ICFilterButtonProps extends PropsWithChildren {
  isExistValue: boolean;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onClear: (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => void;
}

export const CFilterButton: React.FC<ICFilterButtonProps> = ({
  children,
  isExistValue,
  onClick,
  onClear,
}) => {
  return (
    <Button
      variant="outlined"
      className="c-table-filter--button"
      startIcon={
        isExistValue ? (
          <RemoveCircleOutline onClick={onClear} />
        ) : (
          <AddCircleOutline />
        )
      }
      onClick={onClick}
    >
      {children}
    </Button>
  );
};
