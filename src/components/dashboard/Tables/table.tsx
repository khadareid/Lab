import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Plus } from 'lucide-react'
import {Link} from 'react-router-dom'
const mealPlanData = [
  { day: "Monday", breakfast: "Oatmeal with Berries", lunch: "Chicken Salad", dinner: "Grilled Salmon" },
  { day: "Tuesday", breakfast: "Avocado Toast", lunch: "Vegetable Soup", dinner: "Stir-Fry Tofu" },
  { day: "Wednesday", breakfast: "Greek Yogurt Parfait", lunch: "Turkey Sandwich", dinner: "Beef Stir-Fry" },
  { day: "Thursday", breakfast: "Smoothie Bowl", lunch: "Quinoa Salad", dinner: "Baked Chicken" },
  { day: "Friday", breakfast: "Egg White Omelette", lunch: "Tuna Wrap", dinner: "Vegetarian Pizza" },
]

interface MealPlanTableProps {
  onAddMeal: () => void;
}

 function MealPlanTable({ onAddMeal }: MealPlanTableProps) {
  return (
    <div className="rounded-md border overflow-hidden">
        <div className="p-4 bg-gray-50 border-t">
            <Link to='/Form'>
        <Button onClick={onAddMeal} className=" bg-[#4CAF50] text-white hover:bg-[#43a047]">
          <Plus className="mr-2 h-4 w-4" />
          Add New Meal
        </Button></Link>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Day</TableHead>
              <TableHead>Breakfast</TableHead>
              <TableHead>Lunch</TableHead>
              <TableHead>Dinner</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mealPlanData.map((meal) => (
              <TableRow key={meal.day}>
                <TableCell className="font-medium">{meal.day}</TableCell>
                <TableCell>{meal.breakfast}</TableCell>
                <TableCell>{meal.lunch}</TableCell>
                <TableCell>{meal.dinner}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost">Edit</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
    </div>
  )
}

export default MealPlanTable