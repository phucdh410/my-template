import { useState } from "react";
import { Link } from "react-router";

import { ChevronRight, ExpandMore } from "@mui/icons-material";
import { Collapse } from "@mui/material";
import classNames from "classnames";

import { CPermission } from "@/components/controls";
import { useRouteActive } from "@/hooks";

import { ICNavItemProps, ICSubPathItemProps } from "./types";

import "./styles.scss";

export const CNavItem = ({ data }: ICNavItemProps) => {
  return data?.subs ? <CListPathItem data={data} /> : <CPathItem data={data} />;
};

const CPathItem = ({ data }: ICNavItemProps) => {
  //#region Data
  const isRouteActive = useRouteActive(data.path);
  //#endregion

  //#region Render
  return (
    <CPermission permissionCode={data.permission_code}>
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
    </CPermission>
  );
  //#endregion
};

const CListPathItem = ({ data }: ICNavItemProps) => {
  //#region Data
  const [open, setOpen] = useState(false);

  const isRouteActive = useRouteActive(data.path);
  //#endregion

  //#region Render
  return (
    <CPermission permissionCode={data.permission_code}>
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
              <CSubPathItem
                key={`${subItem.name}-${subItem.path}-${subItem.permission_code}`}
                data={subItem}
                parentPath={data.path}
              />
            ))}
          </ul>
        </Collapse>
      </li>
    </CPermission>
  );
  //#endregion
};

const CSubPathItem = ({ data, parentPath }: ICSubPathItemProps) => {
  //#region Data
  const isRouteActive = useRouteActive(`${parentPath}/${data.path}`);
  //#endregion

  //#region Render
  return (
    <CPermission permissionCode={data.permission_code}>
      <li className="c-navigation--nav-li">
        <Link
          to={`/${parentPath}/${data.path}`}
          className={classNames(
            isRouteActive && "active",
            "c-navigation--nav-item sub-item"
          )}
        >
          {data.name}
        </Link>
      </li>
    </CPermission>
  );
  //#endregion
};
