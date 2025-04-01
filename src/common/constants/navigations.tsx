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
        icon: <CoffeeTwoTone />,
      },
      {
        name: "Ecommerce",
        path: "ecommerce",
        icon: <EcommerceIcon />,
      },
      {
        name: "Analytics",
        path: "analytics",
        icon: <AnalyticsIcon />,
      },
      {
        name: "Banking",
        path: "banking",
        icon: <BankingIcon />,
      },
      {
        name: "Booking",
        path: "booking",
        icon: <BookingIcon />,
      },
      {
        name: "File",
        path: "file",
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
        icon: <AccountBoxTwoTone />,
        subs: [
          {
            name: "Profile",
            path: "profile",
          },
          {
            name: "Cards",
            path: "cards",
          },
          {
            name: "List",
            path: "list",
          },
          {
            name: "Create",
            path: "create",
          },
          {
            name: "Edit",
            path: "edit",
          },
        ],
      },
      {
        name: "Product",
        icon: <LocalMallTwoTone />,
        path: "product",
        subs: [
          {
            name: "List",
            path: "list",
          },
          {
            name: "Details",
            path: "details",
          },
          {
            name: "Create",
            path: "create",
          },
          {
            name: "Edit",
            path: "edit",
          },
        ],
      },
      {
        name: "Order",
        path: "order",
        icon: <ShoppingCartTwoTone />,
        subs: [
          {
            name: "List",
            path: "list",
          },
          {
            name: "Details",
            path: "details",
          },
          {
            name: "Create",
            path: "create",
          },
          {
            name: "Edit",
            path: "edit",
          },
        ],
      },
      {
        name: "Blog",
        path: "blog",
        icon: <ChromeReaderModeTwoTone />,
        subs: [
          {
            name: "List",
            path: "list",
          },
          {
            name: "Details",
            path: "details",
          },
          {
            name: "Create",
            path: "create",
          },
          {
            name: "Edit",
            path: "edit",
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
        icon: <LockPersonTwoTone />,
      },
    ],
  },
];
