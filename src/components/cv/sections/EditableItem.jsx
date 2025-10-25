"use client";

import { FiEdit3, FiTrash2, FiChevronUp, FiChevronDown } from "react-icons/fi";

const EditableItem = ({
  item,
  index,
  sectionKey,
  children,
  totalItems,
  isEditing = false,
  onEditItem,
  onDeleteItem,
  onMoveUp,
  onMoveDown,
}) => {
  if (isEditing) {
    return (
      <div className="relative group border border-transparent hover:border-emerald-500 rounded-lg p-2 transition-all">
        {children}

        {/* Kontrol Butonları */}
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 flex gap-1 transition-opacity">
          {/* Yukarı */}
          {index > 0 && onMoveUp && (
            <button
              onClick={() => onMoveUp(sectionKey, index)}
              className="p-1 bg-blue-500 hover:bg-blue-600 text-white rounded shadow-lg"
              title="Yukarı Taşı"
            >
              <FiChevronUp className="w-4 h-4" />
            </button>
          )}

          {/* Aşağı */}
          {index < totalItems - 1 && onMoveDown && (
            <button
              onClick={() => onMoveDown(sectionKey, index)}
              className="p-1 bg-blue-500 hover:bg-blue-600 text-white rounded shadow-lg"
              title="Aşağı Taşı"
            >
              <FiChevronDown className="w-4 h-4" />
            </button>
          )}

          {/* Düzenle */}
          {onEditItem && (
            <button
              onClick={() => onEditItem(sectionKey, item, index)}
              className="p-1 bg-emerald-500 hover:bg-emerald-600 text-white rounded shadow-lg"
              title="Düzenle"
            >
              <FiEdit3 className="w-4 h-4" />
            </button>
          )}

          {/* Sil */}
          {onDeleteItem && (
            <button
              onClick={() => onDeleteItem(sectionKey, index)}
              className="p-1 bg-red-500 hover:bg-red-600 text-white rounded shadow-lg"
              title="Sil"
            >
              <FiTrash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    );
  }

  return <div>{children}</div>;
};

export default EditableItem;
