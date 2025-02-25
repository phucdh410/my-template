export interface ICConfirmDialogProps {
  /**
   * The confirmation message should have a length between 20 and 60 characters.
   */
  confirmation?: string;
  disableCloseOnClickOutside?: boolean;
  cancelText?: string;
  confirmText?: string;
}
