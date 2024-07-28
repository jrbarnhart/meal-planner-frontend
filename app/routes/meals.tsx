import DayInterface from "~/components/meals/dayInterface";
import RouteContent from "~/components/layout/routeContent";
import { json, LoaderFunctionArgs } from "@remix-run/node";
import { PHMealPlan, PHRecipe } from "~/lib/phData";
import { useLoaderData } from "@remix-run/react";
import { useEffect, useState } from "react";
import { getSession } from "~/sessions";
import { mealPlanArraySchema } from "~/lib/zodSchemas/mealPlanSchema";
import { Calendar } from "~/components/ui/calendar";
import { recipeArraySchema } from "~/lib/zodSchemas/recipeSchema";

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"));

  const isLoggedIn = session.has("userId");

  let mealPlans: PHMealPlan[] = [];
  let recipes: PHRecipe[] = [];
  if (isLoggedIn) {
    // Replace with db query
    mealPlans = [];
    recipes = [];
  }

  return json({ mealPlans, recipes, isLoggedIn });
}

export default function Meals() {
  const { mealPlans, recipes, isLoggedIn } = useLoaderData<typeof loader>();
  const mealPlansWithDates = mealPlans.map((plan) => ({
    ...plan,
    date: new Date(plan.date),
  }));

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );

  const [currentMealPlans, setCurrentMealPlans] =
    useState<PHMealPlan[]>(mealPlansWithDates);
  const [currentRecipes, setCurrentRecipes] = useState<PHRecipe[]>(recipes);

  useEffect(() => {
    const localMealsString = localStorage.getItem("localMeals");
    const localRecipesString = localStorage.getItem("localRecipes");

    if ((!localMealsString && !localRecipesString) || isLoggedIn) {
      return;
    }

    if (localMealsString) {
      const localMeals = JSON.parse(localMealsString);
      const zodResultsMeals = mealPlanArraySchema.safeParse(localMeals);
      if (!zodResultsMeals.success) {
        console.error(
          "Error parsing data. Ensure data in local storage has not been modified manually."
        );
      } else {
        setCurrentMealPlans(zodResultsMeals.data);
      }
    }

    if (localRecipesString) {
      const localRecipes = JSON.parse(localRecipesString);
      const zodResultsRecipes = recipeArraySchema.safeParse(localRecipes);
      if (!zodResultsRecipes.success) {
        console.error(
          "Error parsing data. Ensure data in local storage has not been modified manually."
        );
      } else {
        setCurrentRecipes(zodResultsRecipes.data);
      }
    }
  }, [isLoggedIn]);

  // Get the range that would be valid for meal plans. This will be the users first meal record date (or today -1 month if less than that or if null) through 5 years from now.
  // This range should be used to dynamically populate the Carousel below.

  return (
    // Month Name Date Picker
    // Fast Day Carousel
    // Detail Day Carousel
    // Meals Interface
    <RouteContent>
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={setSelectedDate}
      />
      <DayInterface
        selectedDate={selectedDate || new Date()}
        currentMealPlans={currentMealPlans}
        recipes={currentRecipes}
      />
    </RouteContent>
  );
}
