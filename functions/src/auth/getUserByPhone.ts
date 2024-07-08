import { Request, Response } from 'express';
import {getUserByPhoneNumber} from "../../utils/queries";
import {requestGraphQL} from "../../utils/gqlClient";

export const getUserByPhone = async (request: Request, response: Response) => {
    if (request.method !== 'GET') {
        response.status(405).send('Method Not Allowed');
        return;
    }

    const phoneNumber = request.query.phone;

    if (!phoneNumber) {
        response.status(400).send({
            code: "VALIDATION_ERR",
            message: 'Phone number is required'
        });
        return;
    }

    try {
        const user = await requestGraphQL({
            query: getUserByPhoneNumber,
            variables: {
                mobile: phoneNumber,
            },
            operationName: "GetUserByPhoneNumber"
        })


        response.send({
            data: user?.data?.users?.length > 0 ? user?.data?.users[0] : null
        });
    } catch (error) {
        response.status(500).send({
            code: "INTERNAL_SERVER_ERROR",
            message: 'Error while returning user',
            error
        });
    }
};
