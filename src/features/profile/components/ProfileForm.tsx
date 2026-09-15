import React, { useState } from "react";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import saveProfile from "../api/saveProfile";
import {
  Box,
  TextField,
  MenuItem,
  Button,
  CircularProgress,
} from "@mui/material";
import { CheckCircle2, ShieldCheck, UserRound } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import { setProfileConfigured } from "../../auth/utils/authStorage";

interface UserProfile {
  gender: string;
  weight: number;
  height: number;
  age: number;
  activityLevel: string;
  goal: string;
  validated: boolean;
}

const UserProfileSchema = z.object({
  gender: z.string().min(1, "Please select your gender"),
  weight: z.number().positive("Weight must be a positive number"),
  height: z.number().positive("Height must be a positive number"),
  age: z
    .number()
    .positive("Age must be a positive number")
    .int("Age must be a whole number"),
  activityLevel: z.string().min(1, "Please select your activity level"),
  goal: z.string().min(1, "Please select your goal"),
});

const ProfileForm: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useParams();
  const [formData, setFormData] = useState({
    gender: "",
    weight: "",
    height: "",
    age: "",
    activityLevel: "",
    goal: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setErrors({});

    const data = {
      gender: formData.gender,
      weight: parseFloat(formData.weight) || 0,
      height: parseFloat(formData.height) || 0,
      age: parseInt(formData.age) || 0,
      activityLevel: formData.activityLevel,
      goal: formData.goal,
    };

    const validationResult = UserProfileSchema.safeParse(data);

    if (!validationResult.success) {
      const formattedErrors: Record<string, string> = {};
      validationResult.error.errors.forEach((err) => {
        if (err.path[0]) {
          formattedErrors[err.path[0].toString()] = err.message;
        }
      });
      setErrors(formattedErrors);
      return;
    }

    const final = { ...data, validated: true } as UserProfile;
    profileMutation.mutate(final);
  };

  const resetForm = () => {
    setFormData({
      gender: "",
      weight: "",
      height: "",
      age: "",
      activityLevel: "",
      goal: "",
    });
  };

  const profileMutation = useMutation({
    mutationFn: (profile: UserProfile) =>
      saveProfile({
        userProfile: profile,
        token: localStorage.getItem("token") ?? "",
      }),
    onSuccess: () => {
      setProfileConfigured(true);
      resetForm();
      navigate(`/dashboard/${user ?? "user"}`, { replace: true });
    },
  });

  const activityLevels = [
    { value: "sedentary", label: "Sedentary" },
    { value: "lightly_active", label: "Lightly Active" },
    { value: "moderately_active", label: "Moderately Active" },
    { value: "very_active", label: "Very Active" },
    { value: "super_active", label: "Super Active" },
  ];

  const goals = [
    { value: "lose", label: "Lose Weight" },
    { value: "gain", label: "Gain Weight" },
    { value: "maintain", label: "Maintain Weight" },
  ];

  if (profileMutation.isPending) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="400px"
      >
        <CircularProgress />
      </Box>
    );
  }

  const fieldSx = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "13px",
      backgroundColor: "#fff",
    },
  };

  return (
    <div className="profile-layout">
      <aside className="surface profile-aside">
        <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/10">
          <UserRound size={22} />
        </span>
        <h2>Your plan starts here.</h2>
        <p>
          Keep these details current so your daily targets continue to reflect
          your routine.
        </p>
        <div className="absolute bottom-8 left-8 z-10 flex items-center gap-2 text-xs font-bold text-[#cce895]">
          <ShieldCheck size={16} />
          Your profile, your pace
        </div>
      </aside>
      <section className="surface profile-form">
        <div className="surface-header">
          <div>
            <h2>Personal details</h2>
            <p>Update the information used for your nutrition targets.</p>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="profile-form__grid">
            <TextField
              className="profile-form__wide"
              select
              label="Gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              error={!!errors.gender}
              helperText={errors.gender}
              fullWidth
              sx={fieldSx}
            >
              <MenuItem value="">Select Gender</MenuItem>
              <MenuItem value="female">Female</MenuItem>
              <MenuItem value="male">Male</MenuItem>
            </TextField>

            <TextField
              label="Weight (kg)"
              name="weight"
              type="number"
              value={formData.weight}
              onChange={handleChange}
              error={!!errors.weight}
              helperText={errors.weight}
              inputProps={{ min: 0, step: 0.1 }}
              fullWidth
              sx={fieldSx}
            />

            <TextField
              label="Height (cm)"
              name="height"
              type="number"
              value={formData.height}
              onChange={handleChange}
              error={!!errors.height}
              helperText={errors.height}
              inputProps={{ min: 0, step: 0.1 }}
              fullWidth
              sx={fieldSx}
            />

            <TextField
              label="Age"
              name="age"
              type="number"
              value={formData.age}
              onChange={handleChange}
              error={!!errors.age}
              helperText={errors.age}
              inputProps={{ min: 0, step: 1 }}
              fullWidth
              sx={fieldSx}
            />

            <TextField
              select
              label="Activity Level"
              name="activityLevel"
              value={formData.activityLevel}
              onChange={handleChange}
              error={!!errors.activityLevel}
              helperText={errors.activityLevel}
              fullWidth
              sx={fieldSx}
            >
              <MenuItem value="">Select Activity Level</MenuItem>
              {activityLevels.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              select
              label="Goal"
              name="goal"
              value={formData.goal}
              onChange={handleChange}
              error={!!errors.goal}
              helperText={errors.goal}
              fullWidth
              sx={fieldSx}
            >
              <MenuItem value="">Select Goal</MenuItem>
              {goals.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>

            <Button
              className="auth-submit profile-form__wide"
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              sx={{ mt: 1 }}
            >
              Save Profile
            </Button>
            {profileMutation.isSuccess && (
              <p
                className="save-message save-message--success profile-form__wide"
                role="status"
              >
                <CheckCircle2 size={16} /> Profile saved successfully
              </p>
            )}
            {profileMutation.isError && (
              <p
                className="save-message save-message--error profile-form__wide"
                role="alert"
              >
                We couldn’t save your profile. Please try again.
              </p>
            )}
          </div>
        </form>
      </section>
    </div>
  );
};

export default ProfileForm;
