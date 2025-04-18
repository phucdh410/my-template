import { cloneElement, ReactElement } from "react";

import { ICPermissionProps } from "./types";

const MOCKUP_PERMISSION_CODES = [
  "app.view",
  "ecommerce.view",
  "analytics.view",
  "banking.view",
  "booking.view",
  "file.view",

  "user.view",
  // "user.create",
  // "user.edit",

  // "product.view",
  // "product.create",
  // "product.edit",

  "order.view",
  "order.create",
  "order.edit",

  "blog.view",
  "blog.create",
  // "blog.edit",

  // "permission.view"
];

export const CPermission = ({
  permissionCode,
  children,
}: ICPermissionProps) => {
  //#region Render
  return (
    <>
      {MOCKUP_PERMISSION_CODES.includes(permissionCode)
        ? children
        : cloneElement(children as ReactElement<{ disabled?: boolean }>, {
            disabled: true,
          })}
    </>
  );
  //#endregion
};
