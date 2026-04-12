const SESSION_KEY = "yt_verified_session";
const SESSION_MAX_AGE_MS = 8 * 60 * 60 * 1000; // 8 hours

interface VerifiedSession {
  email: string;
  verifiedAt: number;
}

export function saveSession(email: string): void {
  sessionStorage.setItem(
    SESSION_KEY,
    JSON.stringify({ email, verifiedAt: Date.now() })
  );
}

export function getSession(): VerifiedSession | null {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const session: VerifiedSession = JSON.parse(raw);
    if (Date.now() - session.verifiedAt > SESSION_MAX_AGE_MS) {
      clearSession();
      return null;
    }
    return session;
  } catch {
    return null;
  }
}

export function clearSession(): void {
  sessionStorage.removeItem(SESSION_KEY);
}
