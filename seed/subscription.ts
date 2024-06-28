import {requestGQL, SeedResponse} from "./config";
import {faker} from "@faker-js/faker";

const operation = `
  mutation CreateSubscription(
      $userId: uuid!, 
      $assignedChefId: uuid!, 
      $planId: Int!, 
      $paymentId: uuid!
      $amountPaid: Int!
      $startDate: date!
      $endDate: date!
      $slotId: Int!
  ) {
    insert_subscriptions_one(object: {
        user_id: $userId, 
        assigned_chef_id: $assignedChefId, 
        plan_id: $planId, 
        payment_id: $paymentId
        amount_paid: $amountPaid
        start_date: $startDate
        end_date: $endDate
        slot_id: $slotId
    }) {
      id
    }
  }
`;

const variables = {
    userId: "d48e9be1-9588-44aa-bf0f-780404bb257a",
    assignedChefId: "e598f1af-2cc4-429d-9f71-b1da2cfe50cc",
    planId: 1,
    paymentId: "d198d3fc-e6dd-4cf3-88d0-839b19b1cc5e",
    amountPaid: Number(faker.commerce.price()),
    startDate: faker.date.recent().toISOString(),
    endDate: faker.date.soon().toISOString(),
    slotId: 1
};

type InsertSubscriptionsResponse = SeedResponse<'insert_subscriptions_one'>;

export const seedSubscription = async (params?: Partial<typeof variables>): Promise<InsertSubscriptionsResponse> => {
    return requestGQL(
        operation,
        "CreateSubscription",
        {
            ...variables,
            ...params
        }
    )
}

