import { INavigationItem, INavigationSubItem } from "@/types/navigation";

export interface ICNavItemProps {
  data: INavigationItem;
}

export interface ICSubPathItemProps {
  data: INavigationSubItem;
  parentPath: string;
}
