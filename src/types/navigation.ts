import { ReactNode } from "react";

//note: NAVIGATION INTERFACES
export interface INavigationGroup {
  name: string;
  list: INavigationItem[];
}

export interface INavigationItem {
  icon: ReactNode;
  name: string;
  path: string;
  subs?: INavigationSubItem[];
  permission_code: string;

  //note: Name should be short (15 characters) or you shall provide acronym for better mini view
  acronym?: string;
}

export interface INavigationSubItem
  extends Omit<INavigationItem, "icon" | "subs"> {}
