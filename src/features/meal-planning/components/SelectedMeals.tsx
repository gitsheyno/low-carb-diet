import Button from "@mui/material/Button";
import { CheckCircle2, Trash2, Utensils } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import {
  removeMeal,
  resetMeals,
  selectMeals,
} from "../state/mealPlanningSlice";
import saveMealPlan from "../api/saveMealPlan";
import RemoteImage from "../../../shared/components/RemoteImage";

export default function SelectedMeals() {
  const dispatch = useDispatch();
  const meals = useSelector(selectMeals);
  const saveMutation = useMutation({
    mutationFn: saveMealPlan,
    onSuccess: () => dispatch(resetMeals()),
  });

  return (
    <div>
      {meals.length ? (
        <ul className="grid max-h-64 gap-1 overflow-y-auto pr-1">
          {meals.map((item) => (
            <li className="selected-meal" key={item.id}>
              <RemoteImage
                alt={item.name}
                className="selected-meal__image"
                src={item.image}
              />
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
        onClick={() => saveMutation.mutate(meals)}
        sx={{ marginTop: 2 }}
        type="button"
        variant="contained"
      >
        {saveMutation.isPending ? "Saving…" : "Save meal plan"}
      </Button>
      {saveMutation.isSuccess && (
        <p className="save-message save-message--success" role="status">
          <CheckCircle2 size={16} /> Meal plan saved
        </p>
      )}
      {saveMutation.isError && (
        <p className="save-message save-message--error" role="alert">
          We couldn’t save the plan. Please try again.
        </p>
      )}
    </div>
  );
}
