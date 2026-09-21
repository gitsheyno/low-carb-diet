type UnauthorizedHandler = () => void;

let handleUnauthorized: UnauthorizedHandler | null = null;

export function setUnauthorizedHandler(handler: UnauthorizedHandler | null) {
  handleUnauthorized = handler;
}

export async function apiFetch(
  input: RequestInfo | URL,
  init: RequestInit = {}
) {
  const response = await fetch(input, {
    ...init,
    credentials: "include",
  });

  if (response.status === 401) {
    handleUnauthorized?.();
  }

  return response;
}
