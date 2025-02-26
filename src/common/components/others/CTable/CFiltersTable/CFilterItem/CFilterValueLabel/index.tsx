import { memo } from "react";

import { Typography } from "@mui/material";

interface ICFilterValueLabelProps {
  label: string;
}

const UnHOCComponent: React.FC<ICFilterValueLabelProps> = ({ label = "" }) => {
  return (
    <>
      :&nbsp;
      <Typography
        color="primary"
        component="span"
        fontWeight={500}
        fontSize={15}
      >
        {label}
      </Typography>
    </>
  );
};

export const CFilterValueLabel = memo(UnHOCComponent);
