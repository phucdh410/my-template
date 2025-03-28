import { NAVIGATIONS } from "@/constants/navigations";

import { CGroup } from "../CGroup";

export const CNavigations = () => {
  return (
    <nav style={{ paddingInline: "16px", flex: 1 }}>
      <ul style={{ display: "flex", flexDirection: "column" }}>
        {NAVIGATIONS.map((nav, index) => (
          <CGroup key={index} group={nav} />
        ))}
      </ul>
    </nav>
  );
};
