import { useState } from "react";

import { ChevronRight, ExpandMore } from "@mui/icons-material";
import { Collapse } from "@mui/material";
import classNames from "classnames";

import { INavigationItem } from "@/types/navigation";

import "./styles.scss";

export const CNavItem = ({ data }: { data: INavigationItem }) => {
  return data?.subs ? <CListPathItem data={data} /> : <CPathItem data={data} />;
};

const CPathItem = ({
  data,
  active,
}: {
  data: INavigationItem;
  active?: boolean;
}) => {
  return (
    <li className="c-navigation--nav-li">
      <a className={classNames("c-navigation--nav-item", active && "active")}>
        <span className="c-navigation--nav-icon">{data.icon}</span>
        <span className="c-navigation--nav-text">{data.name}</span>
      </a>
    </li>
  );
};

const CListPathItem = ({
  data,
  active,
}: {
  data: INavigationItem;
  active?: boolean;
}) => {
  //#region Data
  const [open, setOpen] = useState(false);
  //#endregion

  //#region Render
  return (
    <li className="c-navigation--nav-li">
      <div
        className={classNames("c-navigation--nav-item", active && "active")}
        onClick={() => setOpen(!open)}
      >
        <span className="c-navigation--nav-icon">{data.icon}</span>
        <span className="c-navigation--nav-text">{data.name}</span>
        {open ? (
          <ExpandMore className="c-navigation--expand-icon" />
        ) : (
          <ChevronRight className="c-navigation--expand-icon" />
        )}
      </div>
      <Collapse in={open} sx={{ paddingLeft: "24px" }}>
        <ul className="c-navigation--sub-list">
          {data.subs!.map((subItem, index) => (
            <li key={index} className="c-navigation--sub-list-item">
              <a href="" className={classNames(active && "active")}>
                {subItem.name}
              </a>
            </li>
          ))}
        </ul>
      </Collapse>
    </li>
  );
  //#endregion
};
