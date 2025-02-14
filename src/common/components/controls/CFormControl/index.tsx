import { Box, FormHelperText } from "@mui/material";

import { ICFormControlProps } from "./types";

export const CFormControl = ({
  error = false,
  errorText = "",
  children,
}: ICFormControlProps) => {
  return (
    <Box className="c-form-control">
      {children}
      {error && errorText && (
        <FormHelperText error={error}>{errorText}</FormHelperText>
      )}
    </Box>
  );
};
