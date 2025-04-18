import {
  AccountBoxTwoTone,
  ChromeReaderModeTwoTone,
  CoffeeTwoTone,
  LocalMallTwoTone,
  LockPersonTwoTone,
  ShoppingCartTwoTone,
} from "@mui/icons-material";

import {
  AnalyticsIcon,
  BankingIcon,
  BookingIcon,
  EcommerceIcon,
  FileIcon,
} from "@/components/others";
import { INavigationGroup } from "@/types/navigation";

export const NAVIGATIONS: INavigationGroup[] = [
  {
    name: "Overview",
    list: [
      {
        name: "App",
        path: "app",
        permission_code: "app.view",
        icon: <CoffeeTwoTone />,
      },
      {
        name: "Ecommerce",
        path: "ecommerce",
        permission_code: "ecommerce.view",
        icon: <EcommerceIcon />,
      },
      {
        name: "Analytics",
        path: "analytics",
        permission_code: "analytic.view",
        icon: <AnalyticsIcon />,
      },
      {
        name: "Banking",
        path: "banking",
        permission_code: "banking.view",
        icon: <BankingIcon />,
      },
      {
        name: "Booking",
        path: "booking",
        permission_code: "booking.view",
        icon: <BookingIcon />,
      },
      {
        name: "File",
        path: "file",
        permission_code: "file.view",
        icon: <FileIcon />,
      },
    ],
  },
  {
    name: "Management",
    list: [
      {
        name: "User",
        path: "user",
        permission_code: "user.view",
        icon: <AccountBoxTwoTone />,
        subs: [
          {
            name: "Profile",
            path: "profile",
            permission_code: "user.view",
          },
          {
            name: "Cards",
            path: "cards",
            permission_code: "user.view",
          },
          {
            name: "List",
            path: "list",
            permission_code: "user.view",
          },
          {
            name: "Create",
            path: "create",
            permission_code: "user.create",
          },
          {
            name: "Edit",
            path: "edit",
            permission_code: "user.edit",
          },
        ],
      },
      {
        name: "Product",
        path: "product",
        permission_code: "product.view",
        icon: <LocalMallTwoTone />,
        subs: [
          {
            name: "List",
            path: "list",
            permission_code: "product.view",
          },
          {
            name: "Details",
            path: "details",
            permission_code: "product.view",
          },
          {
            name: "Create",
            path: "create",
            permission_code: "product.create",
          },
          {
            name: "Edit",
            path: "edit",
            permission_code: "product.edit",
          },
        ],
      },
      {
        name: "Order",
        path: "order",
        permission_code: "order.view",
        icon: <ShoppingCartTwoTone />,
        subs: [
          {
            name: "List",
            path: "list",
            permission_code: "order.view",
          },
          {
            name: "Details",
            path: "details",
            permission_code: "order.view",
          },
          {
            name: "Create",
            path: "create",
            permission_code: "order.create",
          },
          {
            name: "Edit",
            path: "edit",
            permission_code: "order.edit",
          },
        ],
      },
      {
        name: "Blog",
        path: "blog",
        permission_code: "blog.view",
        icon: <ChromeReaderModeTwoTone />,
        subs: [
          {
            name: "List",
            path: "list",
            permission_code: "blog.view",
          },
          {
            name: "Details",
            path: "details",
            permission_code: "blog.view",
          },
          {
            name: "Create",
            path: "create",
            permission_code: "blog.create",
          },
          {
            name: "Edit",
            path: "edit",
            permission_code: "blog.edit",
          },
        ],
      },
    ],
  },
  {
    name: "Misc",
    list: [
      {
        name: "Permission",
        path: "permission",
        permission_code: "permission.view",
        icon: <LockPersonTwoTone />,
      },
    ],
  },
];
