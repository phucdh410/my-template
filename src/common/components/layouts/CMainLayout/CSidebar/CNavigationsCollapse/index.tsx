import { useRef, useState } from "react";
import { Link } from "react-router";

import { ChevronRight } from "@mui/icons-material";
import { ButtonBase, Popover } from "@mui/material";
import classNames from "classnames";

import { CPermission } from "@/components/controls";
import { NAVIGATIONS } from "@/constants/navigations";
import { generateKey } from "@/funcs";
import { useRouteActive } from "@/hooks";
import { INavigationItem, INavigationSubItem } from "@/types/navigation";

import "./styles.scss";

export const CNavigationsCollapse = () => {
  //#region Render
  return (
    <nav className="c-mini-navigation">
      <ul className="c-mini-navigation--ul">
        {NAVIGATIONS.flatMap((group) =>
          group.list.map((navItem, index) => (
            <CPermission
              key={`${navItem.name}-${navItem.path}-${navItem.permission_code}`}
              permissionCode={navItem.permission_code}
            >
              <li className="c-mini-navigation--li">
                {navItem.subs ? (
                  <CNavigationListItems data={navItem} />
                ) : (
                  <CNavigationItem data={navItem} />
                )}
              </li>
            </CPermission>
          ))
        )}
      </ul>
    </nav>
  );
  //#endregion
};

const CNavigationItem = ({ data }: { data: INavigationItem }) => {
  //#region Data
  const isRouteActive = useRouteActive(data.path);
  //#endregion

  //#region Render
  return (
    <Link
      to={`/${data.path}`}
      className={classNames(
        "c-mini-navigation--item",
        isRouteActive && "active"
      )}
    >
      <span className="c-mini-navigation--item-icon">{data.icon}</span>
      <span className="c-mini-navigation--item-text">
        {data?.acronym ?? data.name}
      </span>
    </Link>
  );
  //#endregion
};

const CNavigationListItems = ({ data }: { data: INavigationItem }) => {
  //#region Data
  const isRouteActive = useRouteActive(data.path);

  const [open, setOpen] = useState(false);

  const anchorRef = useRef<HTMLDivElement | null>(null);
  //#endregion

  //#region Event
  const onEnter = () => setOpen(true);
  const onLeave = () => setOpen(false);
  //#endregion

  //#region Render
  return (
    <>
      <ButtonBase
        ref={anchorRef}
        component="div"
        className={classNames(
          "c-mini-navigation--item",
          isRouteActive && "active"
        )}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
      >
        <span className="c-mini-navigation--item-icon">{data.icon}</span>
        <span className="c-mini-navigation--item-text">
          {data?.acronym ?? data.name}
        </span>
        <ChevronRight className="c-mini-navigation--expand-icon" />
      </ButtonBase>
      <Popover
        open={open}
        anchorEl={() => anchorRef.current}
        anchorOrigin={{
          vertical: "center",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "left",
        }}
        className="c-mini-navigation--popover"
        disableRestoreFocus
        aria-hidden={false}
        id="Mini-navigation-presentation"
        slotProps={{
          paper: {
            className: "c-mini-navigation--paper",
            onMouseEnter: onEnter,
            onMouseLeave: onLeave,
          },
        }}
      >
        <div className="c-mini-navigation--dropdown">
          <ul className="c-mini-navigation--ul">
            {data.subs!.map((subItem, index) => (
              <CNavigationDropdownItem
                key={generateKey(subItem.name + index)}
                data={subItem}
                parentPath={data.path}
                onClose={onLeave}
              />
            ))}
          </ul>
        </div>
      </Popover>
    </>
  );
  //#endregion
};

const CNavigationDropdownItem = ({
  data,
  parentPath,
  onClose,
}: {
  data: INavigationSubItem;
  parentPath: string;
  onClose: () => void;
}) => {
  //#region Data
  const isRouteActive = useRouteActive(`${parentPath}/${data.path}`);
  //#endregion

  //#region Render
  return (
    <CPermission
      key={`${data.name}-${data.path}-${data.permission_code}`}
      permissionCode={data.permission_code}
    >
      <li className="c-mini-navigation--li">
        <Link
          to={`/${parentPath}/${data.path}`}
          className={classNames(
            isRouteActive && "active",
            "c-mini-navigation--li-item"
          )}
          onClick={onClose}
        >
          {data.name}
        </Link>
      </li>
    </CPermission>
  );
  //#endregion
};
