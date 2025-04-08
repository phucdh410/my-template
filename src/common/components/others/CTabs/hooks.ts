import { useEffect, useRef } from "react";

export const useHandleIndicator = (value?: string) => {
  const indicatorRef = useRef<HTMLDivElement>(null);
  const tabsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const indicatorEl = indicatorRef.current;
    const tabsContainerEl = tabsContainerRef.current;
    if (indicatorEl && tabsContainerEl) {
      const element = tabsContainerEl.querySelector(".c-tabs--pannel.active");
      if (element) {
        const { width } = element.getBoundingClientRect();
        const offsetLeft = (element as HTMLElement).offsetLeft;
        indicatorEl.style.width = `${width}px`;
        indicatorEl.style.transform = `translateX(${offsetLeft}px)`;
      }
    }
  }, [value]);

  return { indicatorRef, tabsContainerRef };
};
