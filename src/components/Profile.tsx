interface UserProfile {
  gender: string;
  weight: number;
  height: number;
  age: number;
  activityLevel: string;
  goal: string;
  validated: boolean;
}
import React, { useRef, useState, useContext } from "react";
import styles from "./Profile.module.css";
import { z } from "zod";
import { useQuery } from "@tanstack/react-query";
import fetchUser from "../utils/postUserProfile";
import Spinner from "./Spinner";
import { userProfileCTX } from "../store/UserProfileContext";

const Profile: React.FC = () => {
  const genderRef = useRef<HTMLSelectElement>(null);
  const weightRef = useRef<HTMLInputElement>(null);
  const heightRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const activityRef = useRef<HTMLSelectElement>(null);
  const goalRef = useRef<HTMLSelectElement>(null);
  const { handleStatus } = useContext(userProfileCTX);

  const [userProfile, setUserProfile] = useState<UserProfile>({
    gender: "",
    weight: 0,
    height: 0,
    age: 0,
    activityLevel: "",
    goal: "",
    validated: false,
  });
  const UserProfileInfo = z.object({
    gender: z.string(),
    weight: z.number(),
    height: z.number(),
    age: z.number(),
    activityLevel: z.string(),
    goal: z.string(),
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);

    const data = {
      gender: formData.get("gender"),
      weight: parseFloat(formData.get("weight") as string),
      height: parseFloat(formData.get("height") as string),
      age: parseInt(formData.get("age") as string),
      activityLevel: formData.get("activityLevel"),
      goal: formData.get("goal"),
    };

    const validatedProfileInfo = UserProfileInfo.safeParse(data);
    const getData = validatedProfileInfo.data as UserProfile;
    const final = { ...getData, validated: true };
    setUserProfile(final);
    handleStatus();
    resetForm();
  };

  const response = useQuery({
    queryKey: [
      "userProfile",
      userProfile,
      localStorage.getItem("token") as string,
    ],
    queryFn: fetchUser,
  });

  if (response.isFetching) {
    return <Spinner />;
  }
  const resetForm = () => {
    if (
      weightRef.current &&
      genderRef.current &&
      ageRef.current &&
      activityRef.current &&
      goalRef.current
    ) {
      weightRef.current.value = "";
      genderRef.current.value = "";
      ageRef.current.value = "";
      activityRef.current.value = "";
      goalRef.current.value = "";
    }
  };
  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="gender">Gender</label>
          <select
            ref={genderRef}
            name="gender"
            id="gender"
            className={styles.input}
            required
          >
            <option value="">Select Gender</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="weight">Weight (kg)</label>
          <input
            ref={weightRef}
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
            ref={heightRef}
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
            ref={ageRef}
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
            ref={activityRef}
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
          <select
            ref={goalRef}
            name="goal"
            id="goal"
            className={styles.input}
            required
          >
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
