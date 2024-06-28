import {requestGQL, SeedResponse} from "./config";

const operation = `
  mutation CreatePayment($status: String!, $extId: String!, $paymentMethod: String!) {
    insert_payments_one(object: {status: $status, ext_id: $extId, payment_method: $paymentMethod}) {
      id
    }
  }
`;

const variables = {
    "status": `completed`,
    "extId": '1',
    "paymentMethod": `UPI`
}
type InsertPaymentsResponse = SeedResponse<'insert_payments_one'>;

export const seedPayment = async (params?: Partial<typeof variables>): Promise<InsertPaymentsResponse> => {
    return requestGQL(
        operation,
        "CreatePayment",
        {
            ...variables,
            ...params
        }
    )
}

seedPayment()