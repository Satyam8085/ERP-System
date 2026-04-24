import RoleWorkspace from "./RoleWorkspace";

export const overviewModuleRegistry = new Proxy(
  {},
  {
    get(_target, property) {
      return typeof property === "string" ? RoleWorkspace : undefined;
    },
  }
);
