import { useState } from "react";
import { Link } from "react-router";

import { ChevronRight, ExpandMore } from "@mui/icons-material";
import { Collapse } from "@mui/material";
import classNames from "classnames";

import { useRouteActive } from "@/hooks";
import { INavigationItem, INavigationSubItem } from "@/types/navigation";

import "./styles.scss";

export const CNavItem = ({ data }: { data: INavigationItem }) => {
  return data?.subs ? <CListPathItem data={data} /> : <CPathItem data={data} />;
};

const CPathItem = ({ data }: { data: INavigationItem }) => {
  //#region Data
  const isRouteActive = useRouteActive(data.path);
  //#endregion

  return (
    <li className="c-navigation--nav-li">
      <Link
        to={`/${data.path}`}
        className={classNames(
          "c-navigation--nav-item",
          isRouteActive && "active"
        )}
      >
        <span className="c-navigation--nav-icon">{data.icon}</span>
        <span className="c-navigation--nav-text">{data.name}</span>
      </Link>
    </li>
  );
};

const CListPathItem = ({ data }: { data: INavigationItem }) => {
  //#region Data
  const [open, setOpen] = useState(false);

  const isRouteActive = useRouteActive(data.path);
  //#endregion

  //#region Render
  return (
    <li className="c-navigation--nav-li">
      <div
        className={classNames(
          "c-navigation--nav-item",
          isRouteActive && "active"
        )}
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
            <CSubPathItem key={index} data={subItem} parentPath={data.path} />
          ))}
        </ul>
      </Collapse>
    </li>
  );
  //#endregion
};

const CSubPathItem = ({
  data,
  parentPath,
}: {
  data: INavigationSubItem;
  parentPath: string;
}) => {
  //#region Data
  const isRouteActive = useRouteActive(`${parentPath}/${data.path}`);
  //#endregion

  //#region Render
  return (
    <li className="c-navigation--sub-list-item">
      <Link
        to={`/${parentPath}/${data.path}`}
        className={classNames(isRouteActive && "active")}
      >
        {data.name}
      </Link>
    </li>
  );
  //#endregion
};
