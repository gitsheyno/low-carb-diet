import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Paper from "@mui/material/Paper";
import DashboardIcon from "@mui/icons-material/Dashboard";
import BookIcon from "@mui/icons-material/Book";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import { useMediaQuery, useTheme } from "@mui/material";

const BottomNavigationComponent: React.FC = () => {
  const { user } = useParams();
  const navigate = useNavigate();
  const [value, setValue] = React.useState(0);

  // Use theme breakpoints to check if the screen size is small
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm")); // Adjusts to small screens

  const handleNavigation = (index: number, path: string) => {
    setValue(index);
    navigate(path);
  };

  return (
    <Box sx={{ pb: 7 }}>
      <Paper
        sx={{ position: "fixed", top: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <BottomNavigation
          showLabels
          value={value}
          onChange={(_, newValue) => setValue(newValue)}
        >
          <BottomNavigationAction
            label="Dashboard"
            icon={<DashboardIcon />}
            onClick={() => handleNavigation(0, `/dashboard/${user}`)}
            sx={{
              "& .MuiBottomNavigationAction-label": {
                fontSize: isSmallScreen ? "0.6rem" : "0.8rem",
              },
            }}
          />
          <BottomNavigationAction
            label="Recipes"
            icon={<BookIcon />}
            onClick={() => handleNavigation(1, `/dashboard/${user}/Recipes`)}
            sx={{
              "& .MuiBottomNavigationAction-label": {
                fontSize: isSmallScreen ? "0.6rem" : "0.8rem",
              },
            }}
          />
          <BottomNavigationAction
            label="Meal Planner"
            icon={<CalendarTodayIcon />}
            onClick={() => handleNavigation(2, `/dashboard/${user}/planning`)}
            sx={{
              "& .MuiBottomNavigationAction-label": {
                fontSize: isSmallScreen ? "0.6rem" : "0.8rem",
              },
            }}
          />
          <BottomNavigationAction
            label="Profile"
            icon={<PersonIcon />}
            onClick={() => handleNavigation(3, `/dashboard/${user}/profile`)}
            sx={{
              "& .MuiBottomNavigationAction-label": {
                fontSize: isSmallScreen ? "0.6rem" : "0.8rem",
              },
            }}
          />
          <BottomNavigationAction
            label="Logout"
            icon={<LogoutIcon />}
            sx={{
              "& .MuiBottomNavigationAction-label": {
                fontSize: isSmallScreen ? "0.6rem" : "0.8rem",
              },
            }}
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/login");
            }}
          />
        </BottomNavigation>
      </Paper>
    </Box>
  );
};

export default BottomNavigationComponent;
