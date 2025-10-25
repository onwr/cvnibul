"use client";

import {
  FiEdit3,
  FiPlus,
  FiChevronUp,
  FiChevronDown,
  FiTrash2,
} from "react-icons/fi";

const EditableCard = ({
  title,
  icon,
  sectionKey,
  items = [],
  renderItem,
  isEditing = false,
  onEdit,
  onDelete,
  onMoveUp,
  onMoveDown,
  borderColor = "border-gray-300",
  bgColor = "bg-gray-100",
  iconColor = "text-gray-600",
  colSpan = "",
  className = "",
  customBorderColor = null,
  customization = null,
}) => {
  // Profesyonel şablon için custom renk
  const finalBorderColor =
    customization?.professionalCardBorder || customBorderColor;
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
      className="text-gray-400 text-center py-6 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-emerald-500 hover:text-emerald-600 transition-all"
      onClick={() => onEdit(sectionKey, null)}
    >
      <FiEdit3 className="w-6 h-6 mx-auto mb-2" />
      <p className="text-sm font-medium">Bu bölümü doldurmak için tıklayın</p>
      <p className="text-xs mt-1">{title} bilgilerinizi ekleyin</p>
    </div>
  );

  return (
    <div
      className={`bg-white rounded-xl shadow-md border-l-4 p-4 md:p-6 ${colSpan} ${className}`}
      style={{
        borderLeftColor:
          customization?.professionalCardBorder ||
          finalBorderColor ||
          undefined,
      }}
    >
      <h3
        className="text-base md:text-lg font-bold mb-3 md:mb-4 flex items-center justify-between"
        style={{ color: customization?.professionalRightText || "#1f2937" }}
      >
        <div className="flex items-center">
          <div
            className={`w-8 h-8 md:w-10 md:h-10 ${bgColor} rounded-lg flex items-center justify-center mr-2 md:mr-3`}
          >
            <div className={`w-4 h-4 md:w-5 md:h-5 ${iconColor}`}>{icon}</div>
          </div>
          <span className="text-sm md:text-base lg:text-lg">{title}</span>
        </div>
        {isEditing && items.length > 0 && (
          <button
            onClick={() => onEdit(sectionKey, null)}
            className="px-2 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-xs transition-all"
          >
            <FiPlus className="w-3 h-3" />
          </button>
        )}
      </h3>

      {/* İçerik */}
      {items && items.length > 0 ? (
        <div
          className={
            sectionKey === "photoGallery"
              ? "grid grid-cols-2 md:grid-cols-3 gap-4"
              : "space-y-3"
          }
        >
          {items.map((item, index) =>
            renderEditableItem(
              item,
              index,
              renderItem(item, index),
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

export default EditableCard;
