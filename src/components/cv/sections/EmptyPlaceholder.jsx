"use client";

import { FiEdit3 } from "react-icons/fi";

const EmptyPlaceholder = ({ title, description, onClick, className = "" }) => {
  return (
    <div
      className={`text-gray-400 text-center py-8 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer hover:border-emerald-500 hover:text-emerald-400 transition-all ${className}`}
      onClick={onClick}
    >
      <FiEdit3 className="w-8 h-8 mx-auto mb-2" />
      <p className="text-sm">{title || "Bu bölümü doldurmak için tıklayın"}</p>
      {description && <p className="text-xs mt-1">{description}</p>}
    </div>
  );
};

export default EmptyPlaceholder;
