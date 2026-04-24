export default function Navbar({
  menuOpen,
  onMenuToggle,
  onThemeToggle,
  onLogout,
  styles,
  themeMode,
  currentUser,
  roleLabel,
}) {
  const userPrimaryId =
    currentUser.studentId || currentUser.employeeId || currentUser.username;

  return (
    <header style={styles.header}>
      <div style={styles.headerLeft}>
        <button type="button" style={styles.menuBtn} onClick={onMenuToggle}>
          <span style={styles.hamburger}>☰</span>
          <span style={styles.menuText}>Menu</span>
          <span style={styles.menuArrow}>{menuOpen ? "▲" : "▼"}</span>
        </button>
      </div>

      <div style={styles.headerCenter}>
        <div style={styles.logoBlock}>
          <div style={styles.logoTextBlock}>
            <span style={styles.logoIIT}>APEX</span>
            <span style={styles.logoSub}>Institute of Technology</span>
            <span style={styles.logoTagline}>{roleLabel} ERP Portal</span>
            <span style={styles.logoMotto}>- Aim For Excellence -</span>
          </div>
          <div style={styles.logoBadge}>🎓</div>
        </div>
      </div>

      <div style={styles.headerRight}>
        <div style={styles.userBlock}>
          <button
            type="button"
            style={styles.themeToggle}
            onClick={onThemeToggle}
          >
            <span>{themeMode === "light" ? "Dark" : "Light"}</span>
            <span>{themeMode === "light" ? "🌙" : "☀️"}</span>
          </button>
          <button
            type="button"
            style={styles.themeToggle}
            onClick={onLogout}
          >
            <span>Logout</span>
          </button>
          <div style={styles.windowIcons}>
            <span style={styles.windowIcon}>⬜</span>
          </div>
          <span style={styles.userName}>
            {currentUser.fullName || currentUser.name}
            {userPrimaryId ? ` • ${userPrimaryId}` : ""}
            {roleLabel ? ` • ${roleLabel}` : ""}
          </span>
          <div style={styles.userAvatar}>{currentUser.initials}</div>
        </div>
      </div>
    </header>
  );
}
