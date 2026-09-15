import ProfileForm from "../components/ProfileForm";
import { Settings2 } from "lucide-react";
import { getStoredProfileStatus } from "../../auth/utils/authStorage";

export default function ProfilePage() {
  const isOnboarding = getStoredProfileStatus() === false;
  return (
    <div>
      <header className="page-header">
        <div>
          <p className="page-eyebrow">
            {isOnboarding ? "Required setup" : "Profile and targets"}
          </p>
          <h1>
            {isOnboarding
              ? "First, set your nutrition goals."
              : "Make the plan yours."}
          </h1>
          <p>
            {isOnboarding
              ? "Complete these details to calculate your targets and unlock your dashboard."
              : "Your details help shape the daily numbers shown across Plateful."}
          </p>
        </div>
        <span className="page-date-chip">
          <Settings2 size={15} />
          {isOnboarding ? "Step 1 of 1" : "Personal settings"}
        </span>
      </header>
      <ProfileForm />
    </div>
  );
}
