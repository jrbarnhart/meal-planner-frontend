/* eslint-disable no-undef */
// Run this once on a new DB to create default recipe entries
// This will populate the recipe library and allow users to add recipes to their collection from there
// Import necessary modules
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const prisma = new PrismaClient();

async function addDefaultRecipes() {
  try {
    const passHash = await bcrypt.hash(
      process.env.DEFAULT_USER_PASSWORD ?? "",
      10
    );

    // Create a default user that "owns" the default recipes
    const defaultUserInfo = {
      name: "Default User",
      email: "defaultUser@notanemail.com",
      passHash: passHash,
    };

    const newDefaultUser = await prisma.user.create({ data: defaultUserInfo });

    // Create the default recipes using the new user
    const defaultRecipeData = defaultRecipes.map((recipe) => ({
      ...recipe,
      userId: newDefaultUser.id,
    }));
    await prisma.recipe.createMany({ data: defaultRecipeData });
    console.log("Default user and recipes have been added to database.");
  } catch (err) {
    console.error(err);
  } finally {
    await prisma.$disconnect();
  }
}

// Export the function as the default export
export default addDefaultRecipes;

// If this file is executed directly, run the function
if (import.meta.url === `file://${process.argv[1]}`) {
  addDefaultRecipes().catch((e) => {
    console.error(e);
    process.exit(1);
  });
}

const defaultRecipes = [
  {
    isDefault: true,
    name: "Pancakes",
    description: "Fluffy and delicious breakfast pancakes.",
    types: ["breakfast"],
    time: 20,
    feeds: 4,
    requirements: ["mixing bowl", "whisk", "non-stick pan"],
    preNotes: "Ensure you have all ingredients measured out before starting.",
    steps: [
      "In a mixing bowl, whisk together flour, sugar, baking powder, and salt.",
      "In another bowl, mix milk, eggs, and melted butter.",
      "Combine wet and dry ingredients, stirring until just combined.",
      "Heat a non-stick pan over medium heat.",
      "Pour 1/4 cup of batter onto the pan for each pancake.",
      "Cook until bubbles form on the surface, then flip and cook until golden brown.",
      "Serve with syrup and desired toppings.",
    ],
    postNotes:
      "Leftover pancakes can be frozen and reheated for a quick breakfast.",
    ingredients: [
      "1 1/2 cups flour",
      "1 tablespoon sugar",
      "1 tablespoon baking powder",
      "1/2 teaspoon salt",
      "1 1/4 cups milk",
      "1 egg",
      "3 tablespoons melted butter",
    ],
  },
  {
    isDefault: true,
    name: "Grilled Cheese Sandwich",
    description:
      "A classic grilled cheese sandwich with a crispy exterior and gooey interior.",
    types: ["lunch", "snack"],
    time: 10,
    feeds: 1,
    requirements: ["pan", "spatula"],
    preNotes: "Use a good quality bread and cheese for the best results.",
    steps: [
      "Butter one side of each slice of bread.",
      "Place one slice of bread, buttered side down, on a heated pan.",
      "Add cheese slices on top of the bread.",
      "Place the other slice of bread on top, buttered side up.",
      "Cook until the bread is golden brown and the cheese is melted, flipping once.",
      "Serve hot.",
    ],
    postNotes:
      "Experiment with different types of cheese and add-ins like tomatoes or bacon.",
    ingredients: [
      "2 slices of bread",
      "2 slices of cheese",
      "1 tablespoon butter",
    ],
  },
  {
    isDefault: true,
    name: "Chicken Caesar Salad",
    description:
      "A fresh and hearty salad with grilled chicken, romaine lettuce, and Caesar dressing.",
    types: ["lunch", "dinner"],
    time: 25,
    feeds: 2,
    requirements: ["grill or pan", "mixing bowl"],
    preNotes: "Marinate the chicken for at least 30 minutes for extra flavor.",
    steps: [
      "Grill or pan-fry the chicken breasts until cooked through.",
      "Chop the romaine lettuce and place in a mixing bowl.",
      "Slice the cooked chicken and add to the bowl.",
      "Toss with Caesar dressing and top with croutons and Parmesan cheese.",
      "Serve immediately.",
    ],
    postNotes: "Leftovers can be stored in the fridge for up to 2 days.",
    ingredients: [
      "2 chicken breasts",
      "1 head of romaine lettuce",
      "1/2 cup Caesar dressing",
      "1/4 cup grated Parmesan cheese",
      "1 cup croutons",
    ],
  },
  {
    isDefault: true,
    name: "Spaghetti Bolognese",
    description: "A hearty Italian pasta dish with a rich meat sauce.",
    types: ["dinner"],
    time: 60,
    feeds: 4,
    requirements: ["large pot", "saucepan"],
    preNotes:
      "Simmer the sauce for at least 30 minutes to develop the flavors.",
    steps: [
      "Cook spaghetti according to package instructions.",
      "In a saucepan, sauté onions and garlic until soft.",
      "Add ground beef and cook until browned.",
      "Stir in tomato sauce, diced tomatoes, and seasonings.",
      "Simmer for 30 minutes, stirring occasionally.",
      "Serve sauce over cooked spaghetti and top with grated Parmesan cheese.",
    ],
    postNotes: "Leftover sauce can be frozen for later use.",
    ingredients: [
      "400g spaghetti",
      "1 lb ground beef",
      "1 onion, chopped",
      "2 cloves garlic, minced",
      "1 can tomato sauce",
      "1 can diced tomatoes",
      "1 teaspoon dried oregano",
      "1 teaspoon dried basil",
      "Salt and pepper to taste",
      "Grated Parmesan cheese for serving",
    ],
  },
  {
    isDefault: true,
    name: "Chocolate Chip Cookies",
    description: "Classic chewy chocolate chip cookies.",
    types: ["dessert", "snack"],
    time: 30,
    feeds: 8,
    requirements: ["mixing bowl", "baking sheet"],
    preNotes: "Do not overbake to keep the cookies chewy.",
    steps: [
      "Preheat oven to 350°F (175°C).",
      "In a mixing bowl, cream together butter and sugars until smooth.",
      "Beat in eggs one at a time, then stir in vanilla.",
      "Dissolve baking soda in hot water and add to the mixture.",
      "Stir in flour, chocolate chips, and nuts.",
      "Drop by large spoonfuls onto ungreased baking sheets.",
      "Bake for about 10 minutes or until edges are nicely browned.",
    ],
    postNotes: "Store in an airtight container to keep cookies fresh.",
    ingredients: [
      "1 cup butter, softened",
      "1 cup white sugar",
      "1 cup packed brown sugar",
      "2 eggs",
      "2 teaspoons vanilla extract",
      "1 teaspoon baking soda",
      "2 teaspoons hot water",
      "3 cups all-purpose flour",
      "2 cups semisweet chocolate chips",
      "1 cup chopped walnuts (optional)",
    ],
  },
  {
    isDefault: true,
    name: "Chicken Stir-Fry",
    description: "Quick and easy chicken stir-fry with vegetables.",
    types: ["lunch", "dinner"],
    time: 25,
    feeds: 4,
    requirements: ["wok or large pan"],
    preNotes: "Prepare and chop all ingredients before starting to cook.",
    steps: [
      "Heat oil in a wok or large pan over high heat.",
      "Add chicken and cook until no longer pink.",
      "Add vegetables and stir-fry until tender-crisp.",
      "Stir in soy sauce and cook for another minute.",
      "Serve over steamed rice.",
    ],
    postNotes: "Experiment with different vegetables and sauces for variety.",
    ingredients: [
      "1 lb chicken breast, sliced",
      "2 cups mixed vegetables (bell peppers, broccoli, carrots, etc.)",
      "2 tablespoons soy sauce",
      "2 tablespoons vegetable oil",
      "Steamed rice for serving",
    ],
  },
  {
    isDefault: true,
    name: "Blueberry Muffins",
    description: "Soft and moist blueberry muffins.",
    types: ["breakfast", "snack", "dessert"],
    time: 30,
    feeds: 4,
    requirements: ["mixing bowl", "muffin tin"],
    preNotes: "Use fresh or frozen blueberries.",
    steps: [
      "Preheat oven to 400°F (200°C).",
      "In a mixing bowl, cream together butter and sugar.",
      "Beat in eggs, then mix in milk and vanilla.",
      "Combine flour, baking powder, and salt; stir into the batter.",
      "Fold in blueberries.",
      "Spoon batter into muffin cups.",
      "Bake for 20-25 minutes or until a toothpick comes out clean.",
    ],
    postNotes: "Store in an airtight container to keep muffins fresh.",
    ingredients: [
      "1/2 cup butter, softened",
      "1 cup sugar",
      "2 eggs",
      "1 teaspoon vanilla extract",
      "2 cups all-purpose flour",
      "2 teaspoons baking powder",
      "1/2 teaspoon salt",
      "1/2 cup milk",
      "1 1/2 cups blueberries",
    ],
  },
  {
    isDefault: true,
    name: "Beef Tacos",
    description: "Tasty beef tacos with all the fixings.",
    types: ["lunch", "dinner"],
    time: 20,
    feeds: 4,
    requirements: ["pan"],
    preNotes: "Have all toppings ready before cooking the beef.",
    steps: [
      "Cook ground beef in a pan over medium heat until browned.",
      "Stir in taco seasoning and water; simmer for 5 minutes.",
      "Warm taco shells according to package instructions.",
      "Fill taco shells with beef and desired toppings.",
      "Serve immediately.",
    ],
    postNotes: "Leftover beef can be used for taco salads or burritos.",
    ingredients: [
      "1 lb ground beef",
      "1 packet taco seasoning",
      "1/2 cup water",
      "8 taco shells",
      "Toppings: shredded lettuce, diced tomatoes, shredded cheese, sour cream, salsa",
    ],
  },
  {
    isDefault: true,
    name: "Omelette",
    description: "A fluffy omelette filled with cheese and veggies.",
    types: ["breakfast"],
    time: 15,
    feeds: 2,
    requirements: ["non-stick pan", "spatula"],
    preNotes: "Prepare and chop all filling ingredients before starting.",
    steps: [
      "Beat eggs in a bowl and season with salt and pepper.",
      "Heat a non-stick pan over medium heat and add butter.",
      "Pour in eggs and let cook without stirring until edges start to set.",
      "Add cheese and veggies to one side of the omelette.",
      "Fold the other side over the fillings and cook for another minute.",
      "Slide onto a plate and serve immediately.",
    ],
    postNotes:
      "Experiment with different fillings like ham, mushrooms, or spinach.",
    ingredients: [
      "4 eggs",
      "1/4 cup shredded cheese",
      "1/4 cup diced bell peppers",
      "1/4 cup diced onions",
      "1 tablespoon butter",
      "Salt and pepper to taste",
    ],
  },
  {
    isDefault: true,
    name: "BBQ Chicken Pizza",
    description:
      "A delicious pizza topped with BBQ chicken, red onions, and cilantro.",
    types: ["lunch", "dinner"],
    time: 30,
    feeds: 4,
    requirements: ["oven", "pizza stone or baking sheet"],
    preNotes: "Preheat the oven to the highest setting for a crisp crust.",
    steps: [
      "Preheat oven to 475°F (245°C).",
      "Roll out pizza dough on a floured surface.",
      "Spread BBQ sauce evenly over the dough.",
      "Top with shredded chicken, red onions, and cheese.",
      "Bake for 12-15 minutes until the crust is golden and cheese is melted.",
      "Sprinkle with chopped cilantro before serving.",
    ],
    postNotes: "Leftover pizza can be reheated in the oven or microwave.",
    ingredients: [
      "1 pizza dough",
      "1/2 cup BBQ sauce",
      "1 cup shredded cooked chicken",
      "1/2 red onion, thinly sliced",
      "1 1/2 cups shredded mozzarella cheese",
      "1/4 cup chopped cilantro",
    ],
  },
  {
    isDefault: true,
    name: "Veggie Burger",
    description:
      "A healthy and satisfying veggie burger made with black beans.",
    types: ["lunch", "dinner"],
    time: 30,
    feeds: 4,
    requirements: ["food processor", "pan"],
    preNotes: "Drain and rinse black beans thoroughly.",
    steps: [
      "In a food processor, blend black beans, onions, garlic, and spices until well combined.",
      "Form mixture into patties.",
      "Heat oil in a pan over medium heat.",
      "Cook patties for 4-5 minutes on each side until crispy.",
      "Serve on buns with desired toppings.",
    ],
    postNotes: "Patties can be frozen and reheated for a quick meal.",
    ingredients: [
      "1 can black beans, drained and rinsed",
      "1/2 onion, chopped",
      "2 cloves garlic, minced",
      "1 teaspoon cumin",
      "1 teaspoon paprika",
      "Salt and pepper to taste",
      "1/4 cup breadcrumbs",
      "2 tablespoons oil",
      "4 burger buns",
      "Toppings: lettuce, tomato, pickles, ketchup, mustard",
    ],
  },
  {
    isDefault: true,
    name: "Greek Salad",
    description:
      "A fresh and tangy salad with cucumbers, tomatoes, olives, and feta cheese.",
    types: ["lunch", "dinner"],
    time: 15,
    feeds: 4,
    requirements: ["mixing bowl"],
    preNotes: "Use ripe, firm vegetables for the best flavor and texture.",
    steps: [
      "Chop cucumbers, tomatoes, and red onions.",
      "In a mixing bowl, combine chopped vegetables with olives and feta cheese.",
      "Drizzle with olive oil and lemon juice.",
      "Season with salt, pepper, and oregano.",
      "Toss to combine and serve.",
    ],
    postNotes: "Leftovers can be stored in the fridge for up to 2 days.",
    ingredients: [
      "2 cucumbers, chopped",
      "4 tomatoes, chopped",
      "1 red onion, thinly sliced",
      "1/2 cup Kalamata olives",
      "1/2 cup crumbled feta cheese",
      "3 tablespoons olive oil",
      "1 tablespoon lemon juice",
      "1 teaspoon dried oregano",
      "Salt and pepper to taste",
    ],
  },
  {
    isDefault: true,
    name: "Shrimp Tacos",
    description: "Flavorful shrimp tacos with a tangy slaw and creamy sauce.",
    types: ["lunch", "dinner"],
    time: 20,
    feeds: 4,
    requirements: ["pan"],
    preNotes: "Use fresh shrimp for the best taste.",
    steps: [
      "Season shrimp with chili powder, cumin, and salt.",
      "Heat oil in a pan over medium heat.",
      "Cook shrimp for 2-3 minutes on each side until pink and cooked through.",
      "In a bowl, mix cabbage, lime juice, and salt to make the slaw.",
      "Warm tortillas in a pan or microwave.",
      "Assemble tacos by placing shrimp and slaw on each tortilla.",
      "Drizzle with sauce and serve.",
    ],
    postNotes: "Leftover shrimp can be used in salads or pasta.",
    ingredients: [
      "1 lb shrimp, peeled and deveined",
      "1 teaspoon chili powder",
      "1/2 teaspoon cumin",
      "Salt to taste",
      "2 tablespoons oil",
      "2 cups shredded cabbage",
      "2 tablespoons lime juice",
      "8 small tortillas",
      "Sauce: sour cream, lime juice, hot sauce",
    ],
  },
  {
    isDefault: true,
    name: "Mac and Cheese",
    description:
      "Creamy homemade mac and cheese with a crunchy breadcrumb topping.",
    types: ["lunch", "dinner"],
    time: 40,
    feeds: 6,
    requirements: ["large pot", "baking dish"],
    preNotes: "Use a mix of cheeses for a richer flavor.",
    steps: [
      "Cook macaroni according to package instructions.",
      "In a large pot, melt butter over medium heat.",
      "Stir in flour to make a roux, cooking for 1-2 minutes.",
      "Gradually whisk in milk, cooking until thickened.",
      "Stir in cheese until melted and smooth.",
      "Mix in cooked macaroni and pour into a baking dish.",
      "Top with breadcrumbs and bake at 350°F (175°C) for 20 minutes until golden brown.",
    ],
    postNotes: "Leftovers can be reheated in the oven or microwave.",
    ingredients: [
      "2 cups elbow macaroni",
      "1/4 cup butter",
      "1/4 cup flour",
      "2 cups milk",
      "2 cups shredded cheddar cheese",
      "1/2 cup breadcrumbs",
      "Salt and pepper to taste",
    ],
  },
  {
    isDefault: true,
    name: "Fruit Smoothie",
    description: "A refreshing and healthy fruit smoothie.",
    types: ["breakfast", "snack"],
    time: 5,
    feeds: 2,
    requirements: ["blender"],
    preNotes: "Use frozen fruit for a thicker smoothie.",
    steps: [
      "Place all ingredients in a blender.",
      "Blend until smooth.",
      "Pour into glasses and serve immediately.",
    ],
    postNotes: "Experiment with different fruit combinations for variety.",
    ingredients: [
      "1 banana",
      "1 cup frozen berries",
      "1 cup spinach",
      "1 cup almond milk",
      "1 tablespoon honey",
    ],
  },
  {
    isDefault: true,
    name: "Chicken Quesadilla",
    description: "A cheesy chicken quesadilla with a crispy tortilla.",
    types: ["lunch", "dinner"],
    time: 15,
    feeds: 2,
    requirements: ["pan"],
    preNotes: "Use pre-cooked chicken for a quicker meal.",
    steps: [
      "Heat a pan over medium heat.",
      "Place one tortilla in the pan and sprinkle with cheese.",
      "Add cooked chicken and more cheese on top.",
      "Place the second tortilla on top and cook until the bottom tortilla is golden brown.",
      "Flip and cook until the other side is golden brown and cheese is melted.",
      "Cut into wedges and serve with salsa and sour cream.",
    ],
    postNotes: "Leftover quesadillas can be reheated in the oven or microwave.",
    ingredients: [
      "2 tortillas",
      "1 cup shredded cooked chicken",
      "1 cup shredded cheese",
      "Salsa and sour cream for serving",
    ],
  },
  {
    isDefault: true,
    name: "Beef Stew",
    description: "A hearty and comforting beef stew with vegetables.",
    types: ["lunch", "dinner"],
    time: 120,
    feeds: 6,
    requirements: ["large pot"],
    preNotes: "Simmer the stew low and slow for tender meat.",
    steps: [
      "Season beef with salt and pepper.",
      "Heat oil in a large pot and brown the beef.",
      "Add onions, garlic, and carrots, cooking until softened.",
      "Stir in flour and cook for 1-2 minutes.",
      "Add broth, potatoes, and seasonings.",
      "Bring to a boil, then reduce heat and simmer for 2 hours.",
      "Serve hot with crusty bread.",
    ],
    postNotes: "Leftover stew can be stored in the fridge for up to 3 days.",
    ingredients: [
      "2 lbs beef stew meat, cubed",
      "1 onion, chopped",
      "2 cloves garlic, minced",
      "4 carrots, sliced",
      "4 potatoes, cubed",
      "4 cups beef broth",
      "1/4 cup flour",
      "2 tablespoons oil",
      "1 teaspoon thyme",
      "Salt and pepper to taste",
    ],
  },
  {
    isDefault: true,
    name: "Banana Bread",
    description: "Moist and delicious banana bread with a hint of cinnamon.",
    types: ["breakfast", "snack", "dessert"],
    time: 60,
    feeds: 10,
    requirements: ["mixing bowl", "loaf pan"],
    preNotes: "Use overripe bananas for the best flavor.",
    steps: [
      "Preheat oven to 350°F (175°C).",
      "In a mixing bowl, mash bananas with a fork.",
      "Stir in melted butter, sugar, egg, and vanilla.",
      "Mix in baking soda, salt, and flour until just combined.",
      "Pour batter into a greased loaf pan.",
      "Bake for 60 minutes or until a toothpick comes out clean.",
      "Let cool before slicing and serving.",
    ],
    postNotes: "Store in an airtight container to keep the bread fresh.",
    ingredients: [
      "3 ripe bananas",
      "1/2 cup melted butter",
      "1 cup sugar",
      "1 egg",
      "1 teaspoon vanilla extract",
      "1 teaspoon baking soda",
      "1/4 teaspoon salt",
      "1 1/2 cups all-purpose flour",
    ],
  },
];
