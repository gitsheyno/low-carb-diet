import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import handleUserMeals from "../utils/handleUserMeals";
import { removeMeal, selectMeals } from "../store/mealPlanningSlice";

export default function UserMeals() {
  const [submit, setSubmit] = useState(false);
  const dispatch = useDispatch();
  const meals = useSelector(selectMeals);

  useQuery({
    queryKey: [
      "handleUserMeals",
      localStorage.getItem("token") as string,
      meals,
      submit,
    ],
    queryFn: handleUserMeals,
  });

  return (
    <div className="flex flex-col h-full">
      {/* Scrollable meal list container */}
      <div className="flex-1 overflow-hidden mb-3 ">
        <div className="h-full max-h-60 overflow-y-auto pr-1">
          {meals.length > 0 ? (
            <ul className="space-y-2">
              {meals.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center justify-between p-2 bg-white rounded-lg border border-gray-100 hover:bg-gray-50 group"
                >
                  <div className="flex items-center space-x-2">
                    {item.image && (
                      <div className="w-8 h-8 rounded overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src =
                              "https://via.placeholder.com/32?text=M";
                          }}
                        />
                      </div>
                    )}
                    <span className="text-sm truncate max-w-xs">
                      {item.name}
                    </span>
                  </div>
                  <button
                    onClick={() => dispatch(removeMeal(item.id))}
                    className="text-gray-400 hover:text-red-500 p-1 opacity-70 group-hover:opacity-100 transition-opacity"
                    title="Remove meal"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex items-center justify-center h-24 text-gray-500 text-sm bg-gray-50 rounded-lg">
              No meals added yet
            </div>
          )}
        </div>
      </div>

      {/* Fixed button at bottom - outside of scroll area */}
      <div className="mt-auto">
        <Button
          variant="contained"
          type="button"
          onClick={() => setSubmit(true)}
          disabled={meals.length === 0}
          sx={{
            textTransform: "none",
            borderRadius: "8px",
            backgroundColor: "#2563EB",
            "&:hover": {
              backgroundColor: "#1D4ED8",
            },
          }}
          fullWidth
        >
          Save Meal Plan
        </Button>
      </div>
    </div>
  );
}
