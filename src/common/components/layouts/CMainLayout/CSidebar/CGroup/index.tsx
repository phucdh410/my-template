import { useState } from "react";

import { ChevronRight, ExpandMore } from "@mui/icons-material";
import { Collapse } from "@mui/material";

import { INavigationGroup } from "@/types/navigation";

import { CNavItem } from "../CNavItem";

import "./styles.scss";

export const CGroup = ({ group }: { group: INavigationGroup }) => {
  //#region Data
  const [open, setOpen] = useState(true);
  //#endregion

  //#region Render
  return (
    <li className="c-navigation--group">
      <div className="c-navigation--sub-header" onClick={() => setOpen(!open)}>
        {open ? (
          <ExpandMore className="c-navigation--expand-icon" />
        ) : (
          <ChevronRight className="c-navigation--expand-icon" />
        )}
        {group.name}
      </div>
      <Collapse in={open}>
        <ul className="c-navigation--list">
          {group.list.map((listItem, index) => (
            <CNavItem key={index} data={listItem} />
          ))}
        </ul>
      </Collapse>
    </li>
  );
  //#endregion
};
