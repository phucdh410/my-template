import { createConfirmation } from "react-confirm";

import { CConfirmDialog } from "@/components/others";
import { ICConfirmDialogProps } from "@/components/others/CConfirmDialog/types";

export const createCustomConfirmation = createConfirmation(CConfirmDialog);

export interface IConfirmProps extends ICConfirmDialogProps {
  onProceed?: () => void | Promise<void>;
  onCancel?: () => void | Promise<void>;
}

export const confirm = ({ onProceed, onCancel, ...props }: IConfirmProps) => {
  const result = createCustomConfirmation({ ...props });
  result.then((confirmed) => {
    if (confirmed) {
      if (onProceed) onProceed();
    } else {
      if (onCancel) onCancel();
    }
  });
};
