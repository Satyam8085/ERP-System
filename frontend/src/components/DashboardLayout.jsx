import { useEffect, useState } from "react";
import { getDashboardConfig, getDefaultSection } from "./dashboardData";
import { getStyles } from "./dashboardStyles";
import MainSection from "./MainSection";
import MenuDropdown from "./MenuDropdown";
import Navbar from "./Navbar";
import { overviewModuleRegistry } from "./overview/moduleRegistry";
import Sidebar from "./Sidebar";
import { dashboardApi } from "../services/api";

function getRoleLabel(role) {
  return role ? role[0].toUpperCase() + role.slice(1) : "User";
}

function getRoleOverviewCopy(role) {
  switch (role) {
    case "staff":
      return {
        title: "Staff Dashboard",
        description:
          "Manage teaching workflows, student support tasks, communication, and day-to-day academic operations from one place.",
      };
    case "admin":
      return {
        title: "Admin Dashboard",
        description:
          "Monitor ERP activity, institutional communication, campus operations, and administrative workflows from one place.",
      };
    default:
      return {
        title: "Student Dashboard",
        description:
          "Access all student services, academic tools, and updates from one place.",
      };
  }
}

export default function DashboardLayout({ currentUser, onLogout }) {
  const fallbackConfig = getDashboardConfig(currentUser?.role);
  const [themeMode, setThemeMode] = useState("light");
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
  const [noticeVisible, setNoticeVisible] = useState(true);
  const [activeSection, setActiveSection] = useState(getDefaultSection(currentUser?.role));
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(fallbackConfig.modules[0]?.id ?? null);
  const [openedItemId, setOpenedItemId] = useState(null);
  const [sections, setSections] = useState(fallbackConfig.sections);
  const [modules, setModules] = useState(fallbackConfig.modules);
  const styles = getStyles(themeMode);
  const roleLabel = getRoleLabel(currentUser?.role);
  const overviewCopy = getRoleOverviewCopy(currentUser?.role);
  const roleAwareSections = sections.map((section) =>
    section.id === "overview"
      ? {
          ...section,
          title: overviewCopy.title,
          description: overviewCopy.description,
        }
      : section
  );
  const resolvedActiveSection =
    roleAwareSections.find((section) => section.id === activeSection.id) ||
    roleAwareSections[0] ||
    activeSection;

  const visibleItems =
    resolvedActiveSection.id === "overview"
      ? modules
      : modules.filter((item) => item.section === resolvedActiveSection.id);

  const selectedItem =
    visibleItems.find((item) => item.id === selectedItemId) || visibleItems[0] || null;
  const SelectedOverviewComponent = selectedItem
    ? overviewModuleRegistry[selectedItem.id] || null
    : null;
  const openedItem =
    visibleItems.find((item) => item.id === openedItemId) || null;
  const OpenedOverviewComponent = openedItem
    ? overviewModuleRegistry[openedItem.id] || null
    : null;

  useEffect(() => {
    let mounted = true;

    dashboardApi
      .bootstrap()
      .then((data) => {
        if (!mounted) {
          return;
        }

        setSections(data.sections?.length ? data.sections : fallbackConfig.sections);
        setModules(data.modules?.length ? data.modules : fallbackConfig.modules);
      })
      .catch(() => {
        if (!mounted) {
          return;
        }

        setSections(fallbackConfig.sections);
        setModules(fallbackConfig.modules);
      });

    return () => {
      mounted = false;
    };
  }, [fallbackConfig.modules, fallbackConfig.sections]);

  useEffect(() => {
    setActiveSection(getDefaultSection(currentUser?.role));
    setSelectedItemId(getDashboardConfig(currentUser?.role).modules[0]?.id ?? null);
    setOpenedItemId(null);
  }, [currentUser?.role]);

  useEffect(() => {
    if (!visibleItems.some((item) => item.id === selectedItemId)) {
      setSelectedItemId(visibleItems[0]?.id ?? null);
    }
  }, [selectedItemId, visibleItems]);

  useEffect(() => {
    if (openedItemId && !visibleItems.some((item) => item.id === openedItemId)) {
      setOpenedItemId(null);
    }
  }, [openedItemId, visibleItems]);

  return (
    <div style={styles.root}>
      <Sidebar
        activeSection={resolvedActiveSection}
        sections={roleAwareSections}
        onExpandedChange={setSidebarExpanded}
        styles={styles}
        onSectionChange={(section) => {
          setActiveSection(section);
          setMenuOpen(false);
          setActiveItem(null);
          setOpenedItemId(null);
        }}
      />

      <div style={styles.main}>
        <div style={styles.mainBackdrop}>
          <div style={styles.backdropGlowPrimary} />
          <div style={styles.backdropGlowSecondary} />
        </div>

        <div style={styles.contentLayer}>
          <Navbar
            menuOpen={menuOpen}
            styles={styles}
            themeMode={themeMode}
            currentUser={currentUser}
            roleLabel={roleLabel}
            onMenuToggle={() => setMenuOpen((currentValue) => !currentValue)}
            onThemeToggle={() =>
              setThemeMode((currentMode) =>
                currentMode === "light" ? "dark" : "light"
              )
            }
            onLogout={onLogout}
          />

          {menuOpen && (
            <MenuDropdown
              title={resolvedActiveSection.label}
              menuItems={visibleItems}
              activeItem={activeItem}
              selectedItemId={selectedItemId}
              onItemEnter={setActiveItem}
              onItemLeave={() => setActiveItem(null)}
              onItemSelect={(item) => {
                setSelectedItemId(item.id);
                setOpenedItemId(item.id);
                setMenuOpen(false);
              }}
              sidebarExpanded={sidebarExpanded}
              styles={styles}
            />
          )}

          <MainSection
            activeSection={resolvedActiveSection}
            visibleItems={visibleItems}
            selectedItemId={selectedItemId}
            selectedItem={selectedItem}
            SelectedOverviewComponent={SelectedOverviewComponent}
            openedItem={openedItem}
            OpenedOverviewComponent={OpenedOverviewComponent}
            currentUser={currentUser}
            roleLabel={roleLabel}
            noticeVisible={noticeVisible}
            onNoticeClose={() => setNoticeVisible(false)}
            onItemSelect={(item) => {
              setSelectedItemId(item.id);
              setOpenedItemId(item.id);
            }}
            onBackToOverview={() => setOpenedItemId(null)}
            styles={styles}
          />
        </div>
      </div>
    </div>
  );
}
