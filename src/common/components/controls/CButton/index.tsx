import { Button } from "@mui/material";
import classNames from "classnames";

import { ICButtonProps } from "./types";

export const CButton: React.FC<ICButtonProps> = ({
  loading = null,
  className,
  disabled,
  children,
  startIcon,
  endIcon,
  ...props
}) => {
  return (
    <Button
      className={classNames("c-button")}
      disabled={disabled}
      loading={loading}
      loadingPosition={startIcon ? "start" : endIcon ? "end" : "center"}
      startIcon={startIcon}
      endIcon={endIcon}
      {...props}
    >
      {children}
    </Button>
  );
};
