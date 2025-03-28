import { AdminPanelSettingsTwoTone } from "@mui/icons-material";

import { INavigationGroup } from "@/types/navigation";

export const NAVIGATIONS: INavigationGroup[] = [
  {
    name: "Overview",
    list: [
      {
        name: "App",
        path: "app",
        icon: <AdminPanelSettingsTwoTone />,
      },
      {
        name: "Ecommerce",
        path: "ecommerce",
        icon: <AdminPanelSettingsTwoTone />,
      },
      {
        name: "Analytics",
        path: "analytics",
        icon: <AdminPanelSettingsTwoTone />,
      },
      {
        name: "Banking",
        path: "banking",
        icon: <AdminPanelSettingsTwoTone />,
      },
      {
        name: "Booking",
        path: "booking",
        icon: <AdminPanelSettingsTwoTone />,
      },
      {
        name: "File",
        path: "file",
        icon: <AdminPanelSettingsTwoTone />,
      },
    ],
  },
  {
    name: "Management",
    list: [
      {
        name: "User",
        path: "/user",
        icon: <AdminPanelSettingsTwoTone />,
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
        icon: <AdminPanelSettingsTwoTone />,
        path: "product",
        subs: [
          {
            name: "List",
            path: "list",
          },
          {
            name: "Details",
            path: "detail",
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
