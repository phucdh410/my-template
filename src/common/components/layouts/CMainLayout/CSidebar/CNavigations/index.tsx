import { useEffect, useRef } from "react";

import Scrollbar from "smooth-scrollbar";

import { NAVIGATIONS } from "@/constants/navigations";

import { CGroup } from "../CGroup";

import "./styles.scss";

export const CNavigations = () => {
  const scrollbarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollbarRef.current) {
      const scrollbar = Scrollbar.init(scrollbarRef.current, {
        damping: 0.01525, // Adjust smoothness
        thumbMinSize: 10,
      });

      return () => {
        scrollbar.destroy();
      };
    }
  }, []);

  return (
    <nav
      className="c-navigation"
      ref={scrollbarRef}
      style={{ paddingInline: "16px", flex: 1 }}
    >
      <ul style={{ display: "flex", flexDirection: "column" }}>
        {NAVIGATIONS.map((nav, index) => (
          <CGroup key={index} group={nav} />
        ))}
      </ul>
    </nav>
  );
};
