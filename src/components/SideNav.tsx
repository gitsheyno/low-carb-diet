import React from "react";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
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
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const navItems = [
    {
      label: "Dashboard",
      icon: <DashboardIcon />,
      path: `/dashboard/${user}`,
      exact: true,
    },
    {
      label: "Recipes",
      icon: <BookIcon />,
      path: `/dashboard/${user}/Recipes`,
      exact: false,
    },
    {
      label: "Meal Planner",
      icon: <CalendarTodayIcon />,
      path: `/dashboard/${user}/planning`,
      exact: false,
    },
    {
      label: "Profile",
      icon: <PersonIcon />,
      path: `/dashboard/${user}/profile`,
      exact: false,
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Box sx={{ pb: 7 }}>
      <Paper
        sx={{ position: "fixed", top: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <Box sx={{ display: "flex", justifyContent: "space-around" }}>
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.path}
              end={item.exact}
              style={({ isActive }) => ({
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "12px 16px",
                minWidth: 0,
                flex: 1,
                textDecoration: "none",
                color: isActive
                  ? theme.palette.primary.main
                  : theme.palette.text.secondary,
                borderBottom: isActive
                  ? `2px solid ${theme.palette.primary.main}`
                  : "none",
              })}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                {item.icon}
                <Box
                  component="span"
                  sx={{
                    fontSize: isSmallScreen ? "0.6rem" : "0.8rem",
                    mt: 0.5,
                  }}
                >
                  {item.label}
                </Box>
              </Box>
            </NavLink>
          ))}

          <Box
            onClick={handleLogout}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "12px 16px",
              minWidth: 0,
              flex: 1,
              color: theme.palette.text.secondary,
              cursor: "pointer",
            }}
          >
            <LogoutIcon />
            <Box
              component="span"
              sx={{
                fontSize: isSmallScreen ? "0.6rem" : "0.8rem",
                mt: 0.5,
              }}
            >
              Logout
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default BottomNavigationComponent;
