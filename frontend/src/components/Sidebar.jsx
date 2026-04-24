import { useState } from "react";
import {
  SIDEBAR_COLLAPSED_WIDTH,
  SIDEBAR_EXPANDED_WIDTH,
} from "./dashboardStyles";

export default function Sidebar({
  activeSection,
  sections,
  onSectionChange,
  onExpandedChange,
  styles,
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleExpand = (expanded) => {
    setIsExpanded(expanded);
    onExpandedChange?.(expanded);
  };

  return (
    <aside
      style={{
        ...styles.sidebar,
        width: isExpanded ? SIDEBAR_EXPANDED_WIDTH : SIDEBAR_COLLAPSED_WIDTH,
      }}
      onMouseEnter={() => handleExpand(true)}
      onMouseLeave={() => handleExpand(false)}
    >
      <div style={styles.sideLogoWrap}>
        <div style={styles.sideLogo}>📚</div>
      </div>

      <nav style={styles.sideNav} aria-label="Dashboard sections">
        {sections.map((section) => {
          const isActive = section.id === activeSection.id;

          return (
            <button
              key={section.id}
              type="button"
              title={section.title}
              aria-pressed={isActive}
              onClick={() => onSectionChange(section)}
              style={{
                ...styles.sideNavButton,
                justifyContent: isExpanded ? "flex-start" : "center",
                ...(isActive ? styles.sideNavButtonActive : {}),
              }}
            >
              <span style={styles.sideNavIcon}>{section.icon}</span>
              <span
                style={{
                  ...styles.sideNavLabel,
                  opacity: isExpanded ? 1 : 0,
                  width: isExpanded ? "auto" : 0,
                  overflow: "hidden",
                }}
              >
                {section.label}
              </span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
