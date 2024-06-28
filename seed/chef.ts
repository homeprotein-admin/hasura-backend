import {requestGQL, SeedResponse} from "./config";
import {faker} from "@faker-js/faker";

const operation = `
  mutation CreateChef($fname: String!, $lname: String!, $mobile: String!, $wap: String!) {
    insert_chefs_one(object: {first_name: $fname, last_name: $lname, mobile: $mobile, whatsapp: $wap}) {
      id
    }
  }
`;

type InsertChefsResponse = SeedResponse<'insert_chefs_one'>;

const variables = {
    "fname": faker.person.firstName(),
    "lname": faker.person.firstName(),
    "mobile": faker.phone.number(),
    "wap": faker.phone.number(),
}


export const seedChef = async (params?: Partial<typeof variables>): Promise<InsertChefsResponse> => {
    return requestGQL(
        operation,
        "CreateChef",
        {
            ...variables,
            ...params
        }
    )
}

