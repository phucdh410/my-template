import { Typography } from "@mui/material";

interface ICFilterValueLabelProps {
  label: string;
}

export const CFilterValueLabel: React.FC<ICFilterValueLabelProps> = ({
  label = "",
}) => {
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
