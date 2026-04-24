export default function MainSection({
  activeSection,
  visibleItems,
  selectedItemId,
  selectedItem,
  SelectedOverviewComponent,
  openedItem,
  OpenedOverviewComponent,
  currentUser,
  roleLabel,
  noticeVisible,
  onNoticeClose,
  onItemSelect,
  onBackToOverview,
  styles,
}) {
  const serviceLabel = visibleItems.length === 1 ? "service" : "services";
  const personalizedNotice =
    currentUser.role === "staff"
      ? "Faculty review updates and student support tasks are available in the portal."
      : currentUser.role === "admin"
        ? "Administrative alerts, ERP monitoring tasks, and campus coordination updates are available in the portal."
        : "There will be a fine of INR 50 per day from January 1, 2026 for late fee if 100% fee is not paid.";
  const introStats = [
    {
      label: "Signed In As",
      value: roleLabel,
      helper: currentUser.designation || currentUser.course || "Portal access enabled",
      icon: "CMD",
    },
    {
      label: "Live Modules",
      value: String(visibleItems.length).padStart(2, "0"),
      helper: `${serviceLabel} ready`,
      icon: "MOD",
    },
    {
      label: "Portal Status",
      value: "Active",
      helper: "System online",
      icon: "ON",
    },
    {
      label: "Notice Board",
      value: noticeVisible ? "Open" : "Hidden",
      helper: `${roleLabel} alerts`,
      icon: "NB",
    },
  ];

  if (OpenedOverviewComponent && openedItem) {
    return (
      <section style={styles.modulePageSection}>
        <div style={styles.modulePageToolbar}>
          <button
            type="button"
            style={styles.modulePageBackButton}
            onClick={onBackToOverview}
          >
            ← Back
          </button>

          <div style={styles.modulePageMeta}>
            <span style={styles.modulePageCaption}>{activeSection.label}</span>
            <h2 style={styles.modulePageTitle}>{openedItem.label}</h2>
          </div>
        </div>

        <OpenedOverviewComponent
          item={openedItem}
          styles={styles}
          currentUser={currentUser}
        />
      </section>
    );
  }

  return (
    <>
      <section style={styles.pageIntro}>
        <div style={styles.introContent}>
          <span style={styles.introBadge}>
            <span style={styles.greenDot}>●</span>
            {currentUser.collegeName || "Apex Institute of Technology"}
          </span>
          <h1 style={styles.introTitle}>{activeSection.title}</h1>
          <p style={styles.introText}>{activeSection.description}</p>

          <div style={styles.introStats}>
            {introStats.map((stat) => (
              <div key={stat.label} style={styles.introStat}>
                <div style={styles.introStatTop}>
                  <span style={styles.introStatIcon}>{stat.icon}</span>
                  <span style={styles.introStatLabel}>{stat.label}</span>
                </div>
                <span style={styles.introStatValue}>{stat.value}</span>
                <span style={styles.introStatHelper}>{stat.helper}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={styles.introMetaCard}>
          <span style={styles.introMetaLabel}>Active Module</span>
          <span style={styles.introMetaValue}>{visibleItems.length}</span>
          <span style={styles.introMetaHelper}>
            {serviceLabel} available in this section
          </span>
        </div>
      </section>

      {noticeVisible && (
        <div style={styles.noticeBar}>
          <span style={styles.noticeText}>
            {roleLabel}: {personalizedNotice}
          </span>
          <button type="button" style={styles.noticeClose} onClick={onNoticeClose}>
            X
          </button>
        </div>
      )}

      <section style={styles.gridSection}>
        <div style={styles.gridSurface}>
          <div style={styles.gridHeader}>
            <div>
              <h2 style={styles.gridTitle}>{activeSection.label}</h2>
              <p style={styles.gridDescription}>
                Select a service below to continue in the chosen area.
              </p>
            </div>
            <span style={styles.serviceCount}>
              {visibleItems.length} {serviceLabel}
            </span>
          </div>

          {visibleItems.length === 0 ? (
            <div style={styles.emptyState}>
              No services are available in this section right now.
            </div>
          ) : (
            <div style={styles.grid}>
              {visibleItems.map((item) => (
                <button
                  type="button"
                  key={item.id}
                  style={{
                    ...styles.card,
                    ...(selectedItemId === item.id ? styles.cardActive : {}),
                  }}
                  onMouseEnter={(event) => {
                    event.currentTarget.style.transform = "translateY(-6px)";
                    event.currentTarget.style.boxShadow = styles.cardHoverShadow;
                  }}
                  onMouseLeave={(event) => {
                    event.currentTarget.style.transform = "translateY(0)";
                    event.currentTarget.style.boxShadow =
                      selectedItemId === item.id
                        ? styles.cardActive.boxShadow
                        : styles.card.boxShadow;
                  }}
                  onClick={() => onItemSelect(item)}
                >
                  <div style={styles.cardIcon}>{item.icon}</div>
                  <span style={styles.cardLabel}>{item.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
