import ProfileForm from "../components/ProfileForm";
import { Settings2 } from "lucide-react";
import { useAuth } from "../../auth/context/AuthContext";

export default function ProfilePage() {
  const { profileConfigured } = useAuth();
  const isOnboarding = profileConfigured === false;
  return (
    <div>
      <header className="page-header">
        <div>
          <p className="page-eyebrow">
            {isOnboarding ? "Recommended setup" : "Profile and targets"}
          </p>
          <h1>
            {isOnboarding
              ? "First, set your nutrition goals."
              : "Make the plan yours."}
          </h1>
          <p>
            {isOnboarding
              ? "Complete these details whenever you’re ready to calculate your personal targets."
              : "Your details help shape the daily numbers shown across Plateful."}
          </p>
        </div>
        <span className="page-date-chip">
          <Settings2 size={15} />
          {isOnboarding ? "Profile reminder" : "Personal settings"}
        </span>
      </header>
      <ProfileForm />
    </div>
  );
}
