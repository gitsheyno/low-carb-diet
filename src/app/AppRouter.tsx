import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router";
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
        <Route path="signin" element={<SignUpPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route path=":user/Recipes" element={<RecipesPage />} />
          <Route path=":user/recipe/:id" element={<RecipeDetailsPage />} />
          <Route path=":user" element={<DashboardPage />} />
          <Route path=":user/planning" element={<MealPlannerPage />} />
          <Route path=":user/profile" element={<ProfilePage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
