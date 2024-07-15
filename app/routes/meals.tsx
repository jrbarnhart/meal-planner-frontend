import DayInterface from "~/components/meals/dayInterface";
import DaySlider from "~/components/meals/daySlider";
import MonthSelector from "~/components/meals/monthSelector";

export default function Meals() {
  // Get the range that would be valid for meal plans. This will be the users first meal record date (or today -1 month if less than that or if null) through 5 years from now.
  // This range should be used to dynamically populate the Carousel below.

  return (
    // Month Name Date Picker
    // Fast Day Carousel
    // Detail Day Carousel
    // Meals Interface
    <div className="flex flex-col items-center mt-4 px-3">
      <MonthSelector />
      <DaySlider />
      <DayInterface />
    </div>
  );
}
