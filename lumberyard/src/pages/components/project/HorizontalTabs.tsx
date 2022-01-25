import React, { useState } from "react";
import cn from "classnames";

interface HorizontalTabsProps {
  tabs: {
    header: string;
    content: JSX.Element;
  }[];
}

const HorizontalTabs: React.FC<HorizontalTabsProps> = ({ tabs }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  return (
    <div>
      <NavigationTabs
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
        headers={tabs.map((t) => t.header)}
      />
      {tabs[selectedIndex].content}
    </div>
  );
};

interface NavigationTabsProps {
  headers: string[];
  selectedIndex: number;
  setSelectedIndex: (index: number) => void;
}

const NavigationTabs: React.FC<NavigationTabsProps> = ({
  headers,
  selectedIndex,
  setSelectedIndex,
}) => {
  const last = headers.length - 1;

  return (
    <div className="flex">
      {headers.map((header, i) => {
        return (
          <div
            className={cn(
              "p-px my-8 overflow-hidden text-left align-middle transition-all transform from-blue-400 to-emerald-500 shadow-xl",
              { "bg-gradient-to-r": i === selectedIndex },
              { "rounded-l-lg": i === 0, "rounded-r-lg": i === last }
            )}
            key={i}
          >
            <button
              key={i}
              className={cn(
                "p-3 w-32 bg-neutral-800 transition-all",
                { "hover:bg-neutral-700": selectedIndex !== i },
                { "rounded-l-lg": i === 0, "rounded-r-lg": i === last }
              )}
              onClick={() => setSelectedIndex(i)}
              disabled={selectedIndex === i}
            >
              <span className="text-lg font-semibold">{header}</span>
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default HorizontalTabs;
