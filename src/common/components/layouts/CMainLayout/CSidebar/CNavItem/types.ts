import { INavigationItem, INavigationSubItem } from "@/types/navigation";

export interface ICNavItemProps {
  data: INavigationItem;
  disabled?: boolean;
}

export interface ICSubPathItemProps {
  data: INavigationSubItem;
  parentPath: string;
  disabled?: boolean;
}
