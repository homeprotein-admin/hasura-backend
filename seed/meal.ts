import {faker} from '@faker-js/faker';
import {requestGQL, SeedResponse} from "./config";

const operation = `
  mutation CreateMeal($carbs: String!, $description: String!, $fat: String!, $fiber: String!, $image: String!, $kcal: String!, $meal_type: String!, $name: String!, $protein: String!) {
    insert_meals_one(object: {carbs: $carbs, description: $description, fat: $fat, fiber: $fiber, image: $image, kcal: $kcal, meal_type: $meal_type, name: $name, protein: $protein}) {
      id
    }
  }
`;

export const mealTypes = ['non_veg', 'veg', 'eggeterian', 'vegan'];

const variables = {
    "carbs": `${faker.number.int(50)}`,
    "description": faker.commerce.productDescription(),
    "fat": `${faker.number.int(50)}`,
    "fiber": `${faker.number.float(50).toFixed(2)}`,
    "image": faker.image.url(),
    "kcal": `${faker.number.float(200).toFixed(2)}`,
    "meal_type": mealTypes[faker.number.int({min: 0, max: 3})],
    "name": faker.commerce.productName(),
    "protein": `${faker.number.float(50).toFixed(2)}`
}

type InsertMealsResponse = SeedResponse<'insert_meals_one'>;

export const seedMeals = async (params?: Partial<typeof variables>): Promise<InsertMealsResponse> => {
    return requestGQL(
        operation,
        "CreateMeal",
        {
            ...variables,
            ...params
        }
    )
}

seedMeals()