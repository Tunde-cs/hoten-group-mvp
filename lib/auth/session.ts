const TOKEN_COOKIE_NAME = "hoten_access_token";
const USER_EMAIL_KEY = "hoten_user_email";
const USER_ROLE_KEY = "hoten_user_role";

type SessionUser = {
  email: string;
  role: string;
};

type SessionPayload = {
  token: string;
  user: SessionUser;
};

export function setSession({ token, user }: SessionPayload) {
  if (typeof window === "undefined") return;

  document.cookie = `${TOKEN_COOKIE_NAME}=${encodeURIComponent(
    token
  )}; Path=/; Max-Age=86400; SameSite=Lax`;

  localStorage.setItem(USER_EMAIL_KEY, user.email);
  localStorage.setItem(USER_ROLE_KEY, user.role);
}

export function clearSession() {
  if (typeof window === "undefined") return;

  document.cookie = `${TOKEN_COOKIE_NAME}=; Path=/; Max-Age=0; SameSite=Lax`;

  localStorage.removeItem(USER_EMAIL_KEY);
  localStorage.removeItem(USER_ROLE_KEY);
}

export function getTokenFromCookie(): string | null {
  if (typeof document === "undefined") return null;

  const match = document.cookie.match(
    new RegExp(`(?:^|; )${TOKEN_COOKIE_NAME}=([^;]*)`)
  );

  return match ? decodeURIComponent(match[1]) : null;
}

export function hasSession(): boolean {
  return !!getTokenFromCookie();
}