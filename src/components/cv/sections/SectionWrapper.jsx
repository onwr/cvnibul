"use client";

import { FiEdit3 } from "react-icons/fi";
import { getAccentColor } from "../utils/templateConfigs";

const SectionWrapper = ({
  sectionKey,
  title,
  icon,
  children,
  config,
  customization = {},
  isEditing = false,
  onEditItem,
  isDraggable = false,
}) => {
  const accentColor = getAccentColor(sectionKey, config, customization);

  return (
    <div
      className={`${config.cardStyle} ${
        isDraggable && isEditing ? "cursor-move" : ""
      }`}
      style={{
        borderRadius: `${customization.borderRadius || 12}px`,
        padding: `${customization.padding || 24}px`,
        marginBottom: `${customization.sectionGap || 32}px`,
      }}
    >
      <h2
        className={`text-xl font-bold ${config.textColor} mb-4 flex items-center justify-between`}
        style={{ fontSize: "var(--font-size-subheading)" }}
      >
        <div className="flex items-center">
          <span
            className="w-8 h-8 rounded-full flex items-center justify-center mr-3"
            style={{ backgroundColor: accentColor }}
          >
            {icon}
          </span>
          {title}
        </div>
        {isEditing && onEditItem && (
          <button
            onClick={() => onEditItem(sectionKey, null)}
            className="px-2 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-xs transition-all"
          >
            <FiEdit3 className="w-3 h-3" />
          </button>
        )}
      </h2>
      {children}
    </div>
  );
};

export default SectionWrapper;
