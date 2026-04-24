import { useState } from "react";
import { getOverviewModule } from "./overviewModules";

export default function OverviewModulePage({ item, styles }) {
  const module = getOverviewModule(item);
  const [activeTab, setActiveTab] = useState("overview");
  const [completedTasks, setCompletedTasks] = useState([]);
  const [actionMessage, setActionMessage] = useState("");

  if (!module) {
    return null;
  }

  const toggleTask = (task) => {
    setCompletedTasks((currentTasks) =>
      currentTasks.includes(task)
        ? currentTasks.filter((currentTask) => currentTask !== task)
        : [...currentTasks, task]
    );
  };

  return (
    <section style={styles.workspaceShell}>
      <div style={styles.workspaceHeader}>
        <div>
          <span style={styles.workspaceEyebrow}>Selected Workspace</span>
          <h3 style={styles.workspaceTitle}>
            {module.icon} {module.label}
          </h3>
          <p style={styles.workspaceText}>{module.heading}</p>
        </div>
        <span style={styles.workspaceStatus}>{module.status}</span>
      </div>

      <div style={styles.workspaceActions}>
        <button
          type="button"
          style={styles.workspacePrimaryAction}
          onClick={() => setActionMessage(`${module.primaryAction} is ready to use.`)}
        >
          {module.primaryAction}
        </button>
        <button
          type="button"
          style={styles.workspaceSecondaryAction}
          onClick={() => {
            setActiveTab("updates");
            setActionMessage(`${module.secondaryAction} opened in this page.`);
          }}
        >
          {module.secondaryAction}
        </button>
      </div>

      {actionMessage ? (
        <div style={styles.workspaceActionMessage}>{actionMessage}</div>
      ) : null}

      <div style={styles.workspaceTabs}>
        {["overview", "checklist", "updates"].map((tab) => (
          <button
            key={tab}
            type="button"
            style={{
              ...styles.workspaceTab,
              ...(activeTab === tab ? styles.workspaceTabActive : {}),
            }}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div style={styles.workspaceMetrics}>
        {module.metrics.map((metric) => (
          <div key={metric.label} style={styles.workspaceMetricCard}>
            <span style={styles.workspaceMetricLabel}>{metric.label}</span>
            <span style={styles.workspaceMetricValue}>{metric.value}</span>
          </div>
        ))}
      </div>

      {activeTab === "overview" ? (
        <div style={styles.workspaceSplitGrid}>
          <div style={styles.workspacePanel}>
            <span style={styles.workspaceChecklistTitle}>Quick Steps</span>
            {module.tasks.map((task) => (
              <div key={task} style={styles.workspaceChecklistItem}>
                <span style={styles.workspaceChecklistBullet}>+</span>
                <span>{task}</span>
              </div>
            ))}
          </div>

          <div style={styles.workspacePanel}>
            <span style={styles.workspaceChecklistTitle}>Quick Links</span>
            {module.resources.map((resource) => (
              <div key={resource} style={styles.workspaceLinkItem}>
                <span style={styles.workspaceLinkBullet}>→</span>
                <span>{resource}</span>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {activeTab === "checklist" ? (
        <div style={styles.workspacePanel}>
          <span style={styles.workspaceChecklistTitle}>Task Checklist</span>
          {module.tasks.map((task) => {
            const isCompleted = completedTasks.includes(task);

            return (
              <button
                key={task}
                type="button"
                style={{
                  ...styles.workspaceChecklistToggle,
                  ...(isCompleted ? styles.workspaceChecklistToggleDone : {}),
                }}
                onClick={() => toggleTask(task)}
              >
                <span style={styles.workspaceChecklistToggleIcon}>
                  {isCompleted ? "✓" : "○"}
                </span>
                <span>{task}</span>
              </button>
            );
          })}
        </div>
      ) : null}

      {activeTab === "updates" ? (
        <div style={styles.workspacePanel}>
          <span style={styles.workspaceChecklistTitle}>Recent Updates</span>
          {module.updates.map((update) => (
            <div key={update} style={styles.workspaceUpdateItem}>
              <span style={styles.workspaceUpdateBullet}>•</span>
              <span>{update}</span>
            </div>
          ))}
        </div>
      ) : null}
    </section>
  );
}
