import { ReactNode } from "react";

//note: NAVIGATION INTERFACE
export interface INavigationGroup {
  name: string;
  list: INavigationItem[];
}

export interface INavigationItem {
  icon: ReactNode;
  name: string;
  path: string;
  subs?: INavigationSubItem[];
}

export interface INavigationSubItem
  extends Omit<INavigationItem, "icon" | "subs"> {}
