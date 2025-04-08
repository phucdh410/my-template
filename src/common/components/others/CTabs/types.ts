export interface ICTabsProps {
  /** Tabs data */
  tabs: ITabs[];
  /** Active tab value */
  value?: string;
  /** Callback function when tab is clicked */
  onChange?: (newTabValue: string) => void;
}

export interface ITabs {
  /** Tab name */
  name: string;
  /** Tab value */
  value: string;
}
