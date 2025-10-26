"use client";

import {
  FiEdit3,
  FiPlus,
  FiChevronUp,
  FiChevronDown,
  FiTrash2,
  FiEye,
  FiEyeOff,
} from "react-icons/fi";

const EditableSidebarSection = ({
  title,
  icon,
  sectionKey,
  items = [],
  renderContent,
  isEditing = false,
  onEdit,
  onDelete,
  onMoveUp,
  onMoveDown,
  className = "",
  customization = null,
  onToggleSectionVisibility = () => {},
}) => {
  const isVisible = customization?.sectionVisibility?.[sectionKey] ?? true;
  // Render editable item wrapper
  const renderEditableItem = (item, index, content, totalItems) => {
    if (isEditing) {
      return (
        <div
          key={index}
          className="relative group border border-transparent hover:border-emerald-500 rounded-lg p-2 transition-all"
        >
          {content}

          {/* Kontrol Butonları */}
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 flex gap-1 transition-opacity">
            {/* Yukarı */}
            {index > 0 && (
              <button
                onClick={() => onMoveUp(sectionKey, index)}
                className="p-1 bg-blue-500 hover:bg-blue-600 text-white rounded shadow-lg"
                title="Yukarı Taşı"
              >
                <FiChevronUp className="w-4 h-4" />
              </button>
            )}

            {/* Aşağı */}
            {index < totalItems - 1 && (
              <button
                onClick={() => onMoveDown(sectionKey, index)}
                className="p-1 bg-blue-500 hover:bg-blue-600 text-white rounded shadow-lg"
                title="Aşağı Taşı"
              >
                <FiChevronDown className="w-4 h-4" />
              </button>
            )}

            {/* Düzenle */}
            <button
              onClick={() => onEdit(sectionKey, item, index)}
              className="p-1 bg-emerald-500 hover:bg-emerald-600 text-white rounded shadow-lg"
              title="Düzenle"
            >
              <FiEdit3 className="w-4 h-4" />
            </button>

            {/* Sil */}
            <button
              onClick={() => onDelete(sectionKey, index)}
              className="p-1 bg-red-500 hover:bg-red-600 text-white rounded shadow-lg"
              title="Sil"
            >
              <FiTrash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      );
    }
    return <div key={index}>{content}</div>;
  };

  // Boş durum placeholder'ı
  const renderEmptyPlaceholder = () => (
    <div
      className="text-white/60 text-center py-6 border-2 border-dashed border-white/30 rounded-lg cursor-pointer hover:border-emerald-500 hover:text-emerald-400 transition-all"
      onClick={() => onEdit(sectionKey, null)}
    >
      <FiEdit3 className="w-6 h-6 mx-auto mb-2" />
      <p className="text-sm font-medium">Bu bölümü doldurmak için tıklayın</p>
      <p className="text-xs mt-1">{title} bilgilerinizi ekleyin</p>
    </div>
  );

  return (
    <div
      className={`mb-8 ${className} ${
        !isVisible && isEditing ? "opacity-50" : ""
      }`}
    >
      <h3 className="text-lg font-bold mb-4 pb-2 border-b border-white/30 flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-5 h-5 mr-2">{icon}</div>
          {title}
        </div>
        {isEditing && (
          <div className="flex items-center gap-2">
            {/* Görünürlük Butonu */}
            <button
              onClick={() => onToggleSectionVisibility?.(sectionKey)}
              className="p-2 hover:bg-white/10 rounded-lg transition-all cursor-pointer relative group"
              title={isVisible ? "Bölümü Gizle" : "Bölümü Göster"}
            >
              {isVisible ? (
                <FiEye className="w-4 h-4 text-white" />
              ) : (
                <FiEyeOff className="w-4 h-4 text-white/50" />
              )}
              {/* Tooltip */}
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                {isVisible ? "Bölümü Gizle" : "Bölümü Göster"}
              </span>
            </button>

            {/* Ekle Butonu */}
            {items.length > 0 && (
              <button
                onClick={() => onEdit(sectionKey, null)}
                className="px-2 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-xs transition-all"
              >
                <FiPlus className="w-3 h-3" />
              </button>
            )}
          </div>
        )}
      </h3>

      {/* İçerik */}
      {items && items.length > 0 ? (
        <div className="space-y-4">
          {items.map((item, index) =>
            renderEditableItem(
              item,
              index,
              renderContent(item, index),
              items.length
            )
          )}
        </div>
      ) : (
        isEditing && renderEmptyPlaceholder()
      )}
    </div>
  );
};

export default EditableSidebarSection;
