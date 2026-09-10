import type { ReactNode } from "react";
import AppBrand from "../../../shared/components/AppBrand";

export default function AuthShell({
  children,
  mode,
}: {
  children: ReactNode;
  mode: "login" | "signup";
}) {
  const isLogin = mode === "login";

  return (
    <div className="auth-layout">
      <aside className="auth-story">
        <AppBrand />
        <div className="auth-story__copy">
          <span>{isLogin ? "Welcome back" : "Start with what matters"}</span>
          <h2>
            {isLogin
              ? "Your everyday plan is waiting."
              : "A clearer way to eat well."}
          </h2>
          <p>
            {isLogin
              ? "Pick up where you left off with your meals, targets, and recipes in one calm place."
              : "Turn your goals into practical daily guidance—without making every meal feel like homework."}
          </p>
        </div>
        <p className="auth-story__footer">
          Personal nutrition, made easier to live with.
        </p>
      </aside>
      <main className="auth-panel">
        <div className="auth-card">
          <div className="auth-card__mobile-brand">
            <AppBrand />
          </div>
          {children}
        </div>
      </main>
    </div>
  );
}
