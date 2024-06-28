import {faker} from '@faker-js/faker';
import {requestGQL, SeedResponse} from "./config";

const operation = `
  mutation CreateOrder(
      $deliveryDate: date!, 
      $deliveredAt: timestamptz!, 
      $mealId: Int!, 
      $slotId: Int!, 
      $subscriptionId: uuid! 
  ) {
    insert_orders_one(object: {
        delivery_date: $deliveryDate, 
        delivered_at: $deliveredAt, 
        meal_id: $mealId, 
        slot_id: $slotId, 
        subscription_id: $subscriptionId
    }) {
      id
    }
  }
`;

const variables = {
    deliveryDate: faker.date.future().toISOString().split('T')[0],
    deliveredAt: faker.date.recent().toISOString(),
    mealId: faker.number.int(100),
    slotId: faker.number.int(10),
    subscriptionId: faker.string.uuid()
};


type InsertMealsResponse = SeedResponse<'insert_orders_one'>;

export const seedOrders = async (params?: Partial<typeof variables>): Promise<InsertMealsResponse> => {
    return requestGQL(
        operation,
        "CreateOrder",
        {
            ...variables,
            ...params
        }
    )
}

