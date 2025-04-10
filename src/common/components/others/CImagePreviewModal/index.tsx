import { forwardRef, useImperativeHandle, useState } from "react";

import { Dialog } from "@mui/material";

import { IUploadedFile } from "@/types/upload";

import { ICImagePreviewModalProps, ICImagePreviewModalRef } from "./types";

export const CImagePreviewModal = forwardRef<
  ICImagePreviewModalRef,
  ICImagePreviewModalProps
>((props, ref) => {
  //#region Data
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<IUploadedFile | null>(null);
  //#endregion

  //#region Event
  const onClose = () => {
    setOpen(false);
    setFile(null);
  };
  //#endregion

  useImperativeHandle(ref, () => ({
    open: (initFile) => {
      setFile(initFile);
      setOpen(true);
    },
  }));

  //#region Render
  return (
    <Dialog open={open} onClose={onClose}>
      <img src={file?.url ?? ""} alt="" />
    </Dialog>
  );
  //#endregion
});
