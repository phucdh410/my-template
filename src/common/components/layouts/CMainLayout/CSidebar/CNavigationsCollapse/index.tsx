import { useState } from "react";
import { Link } from "react-router";

import { ChevronRight } from "@mui/icons-material";
import { ButtonBase, Popover } from "@mui/material";
import classNames from "classnames";

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
            <li
              key={generateKey(navItem.name + index)}
              className="c-mini-navigation--li"
            >
              {navItem.subs ? (
                <CNavigationListItems data={navItem} />
              ) : (
                <CNavigationItem data={navItem} />
              )}
            </li>
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
      <span className="c-mini-navigation--item-text">{data.name}</span>
    </Link>
  );
  //#endregion
};

const CNavigationListItems = ({ data }: { data: INavigationItem }) => {
  //#region Data
  const isRouteActive = useRouteActive(data.path);

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const open = !!anchorEl;
  //#endregion

  //#region Event
  const onMouseEnter = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNavItemLeave = (event: React.MouseEvent<HTMLElement>) => {
    const relatedTarget = event.relatedTarget as HTMLElement | null;
    const dropdownContainer = document.getElementById(
      "Mini-navigation-presentation"
    );
    if (
      relatedTarget &&
      dropdownContainer &&
      dropdownContainer.contains(relatedTarget)
    ) {
      return;
    } else {
      setAnchorEl(null);
    }
  };

  const handleDropdownLeave = (event: React.MouseEvent<HTMLElement>) => {
    const relatedTarget = event.relatedTarget as HTMLElement | null;
    if (relatedTarget && relatedTarget.contains(anchorEl)) {
      return;
    } else {
      setAnchorEl(null);
    }
  };

  const onClose = () => setAnchorEl(null);
  //#endregion

  //#region Render
  return (
    <>
      <ButtonBase
        component="div"
        className={classNames(
          "c-mini-navigation--item",
          isRouteActive && "active"
        )}
        onMouseEnter={onMouseEnter}
        onMouseLeave={handleNavItemLeave}
      >
        <span className="c-mini-navigation--item-icon">{data.icon}</span>
        <span className="c-mini-navigation--item-text">{data.name}</span>
        <ChevronRight className="c-mini-navigation--expand-icon" />
      </ButtonBase>
      <Popover
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "center",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "left",
        }}
        onClose={onClose}
        className="c-mini-navigation--popover"
        disableRestoreFocus
        aria-hidden={false}
        id="Mini-navigation-presentation"
        slotProps={{
          paper: {
            className: "c-mini-navigation--paper",
            onMouseLeave: handleDropdownLeave,
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
                onClose={onClose}
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
  );
  //#endregion
};
