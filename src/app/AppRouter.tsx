import { lazy, Suspense } from "react";
import { Link, Navigate, Route, Routes } from "react-router";
import LandingPage from "../features/landing/pages/LandingPage";
import Spinner from "../shared/components/Spinner";

const LoginPage = lazy(() => import("../features/auth/components/LoginPage"));
const SignUpPage = lazy(() => import("../features/auth/components/SignUpPage"));
const DashboardLayout = lazy(() => import("./layouts/DashboardLayout"));
const RecipesPage = lazy(() => import("../features/recipes/pages/RecipesPage"));
const RecipeDetailsPage = lazy(
  () => import("../features/recipes/pages/RecipeDetailsPage")
);
const ProfilePage = lazy(() => import("../features/profile/pages/ProfilePage"));
const DashboardPage = lazy(
  () => import("../features/dashboard/pages/DashboardPage")
);
const MealPlannerPage = lazy(
  () => import("../features/meal-planning/pages/MealPlannerPage")
);

export default function AppRouter() {
  return (
    <Suspense fallback={<Spinner fullScreen label="Opening Plateful" />}>
      <Routes>
        <Route index path="/" element={<LandingPage />} />
        <Route path="signup" element={<SignUpPage />} />
        <Route path="signin" element={<Navigate replace to="/login" />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route path=":user/Recipes" element={<RecipesPage />} />
          <Route path=":user/recipe/:id" element={<RecipeDetailsPage />} />
          <Route path=":user" element={<DashboardPage />} />
          <Route path=":user/planning" element={<MealPlannerPage />} />
          <Route path=":user/profile" element={<ProfilePage />} />
        </Route>
        <Route
          path="*"
          element={
            <main className="standalone-state">
              <div className="surface empty-state page-state">
                <div>
                  <p className="page-eyebrow">404 · Page not found</p>
                  <h1>That page isn’t on the menu.</h1>
                  <p>The link may be old, or the page may have moved.</p>
                  <Link className="primary-action mt-5" to="/">
                    Back to Plateful
                  </Link>
                </div>
              </div>
            </main>
          }
        />
      </Routes>
    </Suspense>
  );
}
