import OverviewModulePage from "./OverviewModulePage";

export default function createOverviewModule(moduleId) {
  function ModuleComponent({ item, styles }) {
    if (!item || item.id !== moduleId) {
      return null;
    }

    return OverviewModulePage({ item, styles });
  }

  return ModuleComponent;
}
