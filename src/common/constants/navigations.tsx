import { CoffeeTwoTone, LocalMallTwoTone } from "@mui/icons-material";

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
        icon: <i className="fa-duotone fa-regular fa-square-user fa-xl"></i>,
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
        icon: <i className="fa-duotone fa-regular fa-cart-shopping fa-lg"></i>,
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
        icon: <i className="fa-duotone fa-regular fa-file-invoice fa-xl"></i>,
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
        icon: <i className="fa-duotone fa-regular fa-user-lock fa-lg"></i>,
      },
    ],
  },
];
