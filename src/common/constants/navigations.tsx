import {
  AssignmentIndTwoTone,
  CoffeeTwoTone,
  LeaderboardTwoTone,
  LocalMallTwoTone,
  PublicTwoTone,
  SavingsTwoTone,
  ShoppingBagTwoTone,
  SourceTwoTone,
} from "@mui/icons-material";

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
        icon: <ShoppingBagTwoTone />,
      },
      {
        name: "Analytics",
        path: "analytics",
        icon: <LeaderboardTwoTone />,
      },
      {
        name: "Banking",
        path: "banking",
        icon: <SavingsTwoTone />,
      },
      {
        name: "Booking",
        path: "booking",
        icon: <PublicTwoTone />,
      },
      {
        name: "File",
        path: "file",
        icon: <SourceTwoTone />,
      },
    ],
  },
  {
    name: "Management",
    list: [
      {
        name: "User",
        path: "user",
        icon: <AssignmentIndTwoTone />,
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
    ],
  },
];
