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
    <div className="c-navigation--wrapper" ref={scrollbarRef}>
      <nav className="c-navigation--section">
        <ul className="c-navigation--nav-ul">
          {NAVIGATIONS.map((nav, index) => (
            <CGroup key={index} group={nav} />
          ))}
        </ul>
      </nav>
    </div>
  );
};
