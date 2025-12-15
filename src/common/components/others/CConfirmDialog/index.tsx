import { confirmable, ConfirmDialogProps } from "react-confirm";

import {
  Button,
  Dialog,
  Divider,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";

import { ICConfirmDialogProps } from "./types";

import catImg from "./assets/cat.png";
import personImg from "./assets/person.png";
import questionImg from "./assets/question.png";

//note: This component is not within the hierarchy of ThemeProvider, so we must use Styled Components or CSS/SCSS for styling.
import "./styles.scss";

const ConfirmDialog: React.FC<
  ConfirmDialogProps<ICConfirmDialogProps, boolean>
> = ({
  show,
  proceed,
  confirmation = "Are you sure?",
  disableCloseOnClickOutside = false,
  cancelText = "Hủy",
  confirmText = "Ok",
}) => {
  //#region Data
  const theme = useTheme();
  //#endregion

  //#region Event
  const onClose = () => proceed(false);

  const onConfirm = () => proceed(true);
  //#endregion

  //#region Render
  return (
    <Dialog
      className="c-confirm-dialog"
      open={show}
      onClose={disableCloseOnClickOutside ? undefined : onClose}
    >
      <Stack
        className="c-confirm-dialog--main"
        pt={2}
        alignItems="center"
        justifyContent="center"
        spacing={1.5}
      >
        <Stack maxWidth="100px">
          <img src={questionImg} alt="" />
        </Stack>
        <Typography className="confirmation-message" px={2}>
          {confirmation}
        </Typography>
        <Stack
          direction="row"
          width="100%"
          borderTop={`1px solid ${theme.palette.divider}`}
        >
          <Button fullWidth className="cancel-button" onClick={onClose}>
            {cancelText}
          </Button>
          <Divider flexItem orientation="vertical" />
          <Button fullWidth className="confirm-button" onClick={onConfirm}>
            {confirmText}
          </Button>
        </Stack>
      </Stack>
      {/* Remove these if you don't want backgrounds. */}
      <div className="background-1-wrapper">
        <img src={personImg} alt="" />
      </div>
      <div className="background-2-wrapper">
        <img src={catImg} alt="" />
      </div>
    </Dialog>
  );
  //#endregion
};

export const CConfirmDialog = confirmable(ConfirmDialog);
