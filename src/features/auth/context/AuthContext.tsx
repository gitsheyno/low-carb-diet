import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";
import { useQueryClient } from "@tanstack/react-query";
import { setUnauthorizedHandler } from "../../../shared/api/apiFetch";
import {
  getCurrentSession,
  logIn as logInRequest,
  logOut as logOutRequest,
  signUp as signUpRequest,
  type AuthCredentials,
  type SignUpCredentials,
  type UserInfo,
} from "../api/auth";

type AuthContextValue = {
  user: UserInfo | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  profileConfigured: boolean | null;
  logIn: (credentials: AuthCredentials) => Promise<UserInfo>;
  signUp: (credentials: SignUpCredentials) => Promise<UserInfo>;
  logOut: () => Promise<void>;
  setProfileConfigured: (configured: boolean) => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: PropsWithChildren) {
  const queryClient = useQueryClient();
  const [user, setUser] = useState<UserInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [profileConfigured, setProfileConfigured] = useState<boolean | null>(
    null
  );

  const clearAuthState = useCallback(() => {
    queryClient.clear();
    setUser(null);
    setProfileConfigured(null);
  }, [queryClient]);

  useEffect(() => {
    setUnauthorizedHandler(clearAuthState);
    return () => setUnauthorizedHandler(null);
  }, [clearAuthState]);

  useEffect(() => {
    let active = true;

    getCurrentSession()
      .then((session) => {
        if (!active) return;
        setUser(session.user);
        setProfileConfigured(session.profileConfigured);
      })
      .catch(() => {
        if (!active) return;
        setUser(null);
        setProfileConfigured(null);
      })
      .finally(() => {
        if (active) setIsLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const logIn = useCallback(async (credentials: AuthCredentials) => {
    const authenticatedUser = await logInRequest(credentials);
    setUser(authenticatedUser);
    setProfileConfigured(authenticatedUser.profileConfigured);
    return authenticatedUser;
  }, []);

  const signUp = useCallback(async (credentials: SignUpCredentials) => {
    const authenticatedUser = await signUpRequest(credentials);
    setUser(authenticatedUser);
    setProfileConfigured(authenticatedUser.profileConfigured);
    return authenticatedUser;
  }, []);

  const logOut = useCallback(async () => {
    await logOutRequest();
    clearAuthState();
  }, [clearAuthState]);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: user !== null,
      isLoading,
      profileConfigured,
      logIn,
      signUp,
      logOut,
      setProfileConfigured,
    }),
    [isLoading, logIn, logOut, profileConfigured, signUp, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside an AuthProvider");
  }
  return context;
}
