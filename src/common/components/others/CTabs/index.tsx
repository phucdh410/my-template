import classNames from "classnames";

import { useHandleIndicator } from "./hooks";
import { ICTabsProps } from "./types";

import "./styles.scss";

export const CTabs = ({ tabs, value, onChange }: ICTabsProps) => {
  //#region Data
  const { indicatorRef, tabsContainerRef } = useHandleIndicator(value);
  //#endregion

  //#region Event
  const onTabChange = (newValue: string) => () => {
    onChange?.(newValue);
  };
  //#endregion

  //#region Render
  return (
    <div className="c-tabs--wrapper">
      <div ref={tabsContainerRef} className="c-tabs--container">
        {tabs.map((tab) => (
          <div
            key={tab.value}
            className={classNames(
              "c-tabs--pannel",
              value === tab.value && "active"
            )}
            onClick={onTabChange(tab.value)}
          >
            {tab.name}
          </div>
        ))}
        <div className="c-tabs--indicator" ref={indicatorRef}></div>
      </div>
    </div>
  );
  //#endregion
};
