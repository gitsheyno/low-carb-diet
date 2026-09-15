const TOKEN_KEY = "token";
const PROFILE_CONFIGURED_KEY = "profileConfigured";

function tokenHasExpired(token: string) {
  const payload = token.split(".")[1];
  if (!payload) return false;

  try {
    const normalized = payload.replace(/-/g, "+").replace(/_/g, "/");
    const decoded = JSON.parse(atob(normalized)) as { exp?: number };
    return typeof decoded.exp === "number" && decoded.exp * 1000 <= Date.now();
  } catch {
    return false;
  }
}

export function getAuthToken() {
  const token = localStorage.getItem(TOKEN_KEY);
  if (!token || tokenHasExpired(token)) {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(PROFILE_CONFIGURED_KEY);
    return null;
  }
  return token;
}

export function saveAuthSession(token: string, profileConfigured: boolean) {
  localStorage.setItem(TOKEN_KEY, token);
  setProfileConfigured(profileConfigured);
}

export function getStoredProfileStatus() {
  const value = localStorage.getItem(PROFILE_CONFIGURED_KEY);
  return value === null ? null : value === "true";
}

export function setProfileConfigured(configured: boolean) {
  localStorage.setItem(PROFILE_CONFIGURED_KEY, String(configured));
}

export function clearAuthToken() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(PROFILE_CONFIGURED_KEY);
}
