import React, { useState } from "react";
import { z } from "zod";
import { useQuery } from "@tanstack/react-query";
import fetchUser from "../utils/postUserProfile";
import {
  Box,
  TextField,
  MenuItem,
  Button,
  Paper,
  Typography,
  CircularProgress,
} from "@mui/material";

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

const Profile: React.FC = () => {
  const [userProfile, setUserProfile] = useState<UserProfile>({
    gender: "",
    weight: 0,
    height: 0,
    age: 0,
    activityLevel: "",
    goal: "",
    validated: false,
  });

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
    setUserProfile(final);
    resetForm();
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

  const { isFetching } = useQuery({
    queryKey: [
      "userProfile",
      userProfile,
      localStorage.getItem("token") as string,
    ],
    queryFn: fetchUser,
    enabled: userProfile.validated,
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

  if (isFetching) {
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

  return (
    <Paper
      elevation={2}
      sx={{
        maxWidth: 500,
        mx: "auto",
        p: 3,
        borderRadius: 2,
      }}
    >
      <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 3 }}>
        Your Profile
      </Typography>

      <form onSubmit={handleSubmit}>
        <Box display="grid" gap={3}>
          <TextField
            select
            label="Gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            error={!!errors.gender}
            helperText={errors.gender}
            fullWidth
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
          >
            <MenuItem value="">Select Goal</MenuItem>
            {goals.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            sx={{ mt: 2 }}
          >
            Save Profile
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default Profile;
