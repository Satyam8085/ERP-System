const STORAGE_KEY = "erpUser";

function getSessionStorage() {
  if (typeof window === "undefined") {
    return null;
  }

  return window.sessionStorage;
}

function clearLegacyLocalStorage() {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(STORAGE_KEY);
}

export function getStoredUser() {
  const storage = getSessionStorage();

  if (!storage) {
    return null;
  }

  clearLegacyLocalStorage();
  const rawValue = storage.getItem(STORAGE_KEY);

  if (!rawValue) {
    return null;
  }

  try {
    return JSON.parse(rawValue);
  } catch {
    return null;
  }
}

export function storeUser(user) {
  const storage = getSessionStorage();

  if (!storage) {
    return;
  }

  clearLegacyLocalStorage();
  storage.setItem(STORAGE_KEY, JSON.stringify(user));
}

export function clearStoredUser() {
  const storage = getSessionStorage();

  if (!storage) {
    return;
  }

  storage.removeItem(STORAGE_KEY);
  clearLegacyLocalStorage();
}
