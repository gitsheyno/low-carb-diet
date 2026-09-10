import ProfileForm from "../components/ProfileForm";
import { Settings2 } from "lucide-react";

export default function ProfilePage() {
  return (
    <div>
      <header className="page-header">
        <div>
          <p className="page-eyebrow">Profile and targets</p>
          <h1>Make the plan yours.</h1>
          <p>
            Your details help shape the daily numbers shown across Plateful.
          </p>
        </div>
        <span className="page-date-chip">
          <Settings2 size={15} />
          Personal settings
        </span>
      </header>
      <ProfileForm />
    </div>
  );
}
