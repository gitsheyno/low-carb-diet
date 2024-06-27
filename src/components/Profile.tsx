interface UserProfile {
  gender: string;
  weight: number;
  height: number;
  age: number;
  activityLevel: string;
  goal: string;
}
import React, { useState } from "react";
import styles from "./Profile.module.css";

const Profile: React.FC = () => {
  const [userProfile, setUserProfile] = useState<UserProfile>({
    gender: "",
    weight: 0,
    height: 0,
    age: 0,
    activityLevel: "",
    goal: "",
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    // const data = Object.fromEntries(formData.entries()) as UserProfile;
    // setUserProfile(data);
    console.log("User Profile:", formData);
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="gender">Gender</label>
          <select name="gender" id="gender" className={styles.input} required>
            <option value="">Select Gender</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="weight">Weight (kg)</label>
          <input
            type="number"
            name="weight"
            id="weight"
            className={styles.input}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="height">Height (cm)</label>
          <input
            type="number"
            name="height"
            id="height"
            className={styles.input}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="age">Age</label>
          <input
            type="number"
            name="age"
            id="age"
            className={styles.input}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="activityLevel">Activity Level</label>
          <select
            name="activityLevel"
            id="activityLevel"
            className={styles.input}
            required
          >
            <option value="">Select Activity Level</option>
            <option value="sedentary">Sedentary</option>
            <option value="lightly_active">Lightly Active</option>
            <option value="moderately_active">Moderately Active</option>
            <option value="very_active">Very Active</option>
            <option value="super_active">Super Active</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="goal">Goal</label>
          <select name="goal" id="goal" className={styles.input} required>
            <option value="">Select Goal</option>
            <option value="lose">Lose Weight</option>
            <option value="gain">Gain Weight</option>
            <option value="maintain">Maintain Weight</option>
          </select>
        </div>

        <button type="submit" className={styles.button}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Profile;
