import { IUploadedFile } from "@/types/upload";

export interface ICImagePreviewModalRef {
  open: (initFile: IUploadedFile) => void;
}

export interface ICImagePreviewModalProps {}
