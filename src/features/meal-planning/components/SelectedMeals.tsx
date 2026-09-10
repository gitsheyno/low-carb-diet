import Button from "@mui/material/Button";
import { Trash2, Utensils } from "lucide-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { removeMeal, selectMeals } from "../state/mealPlanningSlice";
import saveMealPlan from "../api/saveMealPlan";

export default function SelectedMeals() {
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
    queryFn: saveMealPlan,
  });

  return (
    <div>
      {meals.length ? (
        <ul className="grid max-h-64 gap-1 overflow-y-auto pr-1">
          {meals.map((item) => (
            <li className="selected-meal" key={item.id}>
              {item.image ? (
                <img
                  alt={item.name}
                  className="selected-meal__image"
                  src={item.image}
                />
              ) : (
                <span className="selected-meal__image grid place-items-center">
                  <Utensils size={17} />
                </span>
              )}
              <div className="selected-meal__copy">
                <strong>{item.name}</strong>
                <span>
                  {Math.round(item.caloriesKCal || 0)} kcal ·{" "}
                  {Math.round(item.protein || 0)}g protein
                </span>
              </div>
              <button
                aria-label={`Remove ${item.name}`}
                className="icon-button icon-button--danger"
                onClick={() => dispatch(removeMeal(item.id))}
                type="button"
              >
                <Trash2 size={15} />
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <div className="empty-state min-h-[150px]">
          <div>
            <span className="empty-state__icon">
              <Utensils size={19} />
            </span>
            <h3>No meals selected</h3>
            <p>Add meals from your search results.</p>
          </div>
        </div>
      )}
      <Button
        className="auth-submit"
        disabled={!meals.length}
        fullWidth
        onClick={() => setSubmit(true)}
        sx={{ marginTop: 2 }}
        type="button"
        variant="contained"
      >
        Save meal plan
      </Button>
    </div>
  );
}
