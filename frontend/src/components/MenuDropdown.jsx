import {
  SIDEBAR_COLLAPSED_WIDTH,
  SIDEBAR_EXPANDED_WIDTH,
} from "./dashboardStyles";

export default function MenuDropdown({
  title,
  menuItems,
  activeItem,
  selectedItemId,
  onItemEnter,
  onItemLeave,
  onItemSelect,
  sidebarExpanded,
  styles,
}) {
  return (
    <div
      style={{
        ...styles.dropdown,
        left: sidebarExpanded
          ? SIDEBAR_EXPANDED_WIDTH
          : SIDEBAR_COLLAPSED_WIDTH,
      }}
    >
      <span style={styles.dropdownTitle}>{title}</span>

      {menuItems.map((item, index) => (
        <button
          type="button"
          key={item.id}
          style={{
            ...styles.dropdownItem,
            background:
              activeItem === index || selectedItemId === item.id
                ? styles.themeHoverBackground
                : "transparent",
          }}
          onMouseEnter={() => onItemEnter(index)}
          onMouseLeave={onItemLeave}
          onClick={() => onItemSelect(item)}
        >
          <span style={styles.dropdownIcon}>{item.icon}</span>
          <span style={styles.dropdownLabel}>{item.label}</span>
        </button>
      ))}
    </div>
  );
}
