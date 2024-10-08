import { Form, Link } from "@remix-run/react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { deleteLocalRecipe } from "~/lib/localStorageUtils";
import { SetStateAction } from "react";
import { Recipe } from "@prisma/client";

export default function RecipeEntry({
  ...props
}: {
  recipe: Recipe;
  isLoggedIn: boolean;
  setCurrentRecipes: React.Dispatch<SetStateAction<Recipe[] | null>>;
}) {
  const { recipe, isLoggedIn, setCurrentRecipes } = props;
  const { id, name, time, feeds } = recipe;
  return (
    <Card className="grid grid-flow-col grid-cols-[4fr_3fr_2fr_1fr] items-center p-2">
      <Link to={`/recipes/${recipe.id}`} className="truncate text-accent">
        {name[0].toUpperCase() + name.slice(1)}
      </Link>
      <p>{`${time} min`}</p>
      <p>{feeds}</p>
      <Popover>
        <PopoverTrigger>...</PopoverTrigger>
        <PopoverContent className="flex flex-col gap-3 w-40">
          <p>{name}</p>
          <Button asChild>
            <Link to={`/recipes/${id}`}>Details</Link>
          </Button>
          {isLoggedIn ? (
            <Form method="post">
              <Button type="submit" variant={"destructive"} className="w-full">
                Remove
              </Button>
              <input type="hidden" name="recipeId" value={recipe.id} />
            </Form>
          ) : (
            <Button
              onClick={() => {
                deleteLocalRecipe(recipe);
                setCurrentRecipes((prev) =>
                  (prev ?? []).filter((rec) => rec.id !== recipe.id)
                );
              }}
              variant={"destructive"}
            >
              Remove
            </Button>
          )}
        </PopoverContent>
      </Popover>
    </Card>
  );
}
