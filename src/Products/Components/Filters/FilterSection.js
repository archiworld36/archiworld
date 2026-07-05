import { ChevronDown, ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";

export const FilterSection = ({ title, sectionKey, children , defaultOpen = false,}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const toggleSection = (key) => {
    setIsOpen((prev) => (prev === key ? null : key));
  };

  useEffect(() => {
    if (defaultOpen) {
      setIsOpen(true);
    }
  }, [defaultOpen]);
  return (
    <div className="border-t border-[var(--stroke)] py-5">
      <h4
        onClick={() => toggleSection(sectionKey)}
        className="text-[clamp(12px,3.5vw,40px)] sm:text-[clamp(12px,2.1vw,30px)] lg:text-[clamp(10px,1.2vw,40px)] font-medium flex justify-between items-center cursor-pointer"
      >
        {title}

        {isOpen ? (
          <ChevronDown className="w-5 h-5" />
        ) : (
          <ChevronUp className="w-5 h-5" />
        )}
      </h4>

      {isOpen && <div>{children}</div>}
    </div>
  );
};
