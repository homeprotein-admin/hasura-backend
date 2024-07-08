import * as logger from "firebase-functions/logger";
import * as admin from "firebase-admin";
import { Request, Response } from 'express';
import {createUserMutation, getUserByEmail} from "../../utils/queries";
import {requestGraphQL} from "../../utils/gqlClient";

// Initialize the Firebase Admin SDK
admin.initializeApp();

export const registerUser = async (request: Request, response: Response) => {
    if (request.method !== 'POST') {
        response.status(405).send('Method Not Allowed');
        return;
    }

    const user = await requestGraphQL({
        query: getUserByEmail,
        variables: {
            email: request?.body?.user?.email,
        },
        operationName: "GetUserByEmail"
    })

    if(user?.data?.users?.length > 0) {
        response.status(400).send({
            code: "EMAIL_EXISTS",
            message: "Email already exist"
        })
        return
    }


    const newUser = await requestGraphQL({
        query: createUserMutation,
        variables: request?.body?.user,
        operationName: "CreateUser"
    });

    const idToken = request.headers.authorization?.split('Bearer ')[1];
    if (!idToken) {
        response.status(400).send({
            code: "AUTH",
            message: 'Authorization header is missing'
        });
        return;
    }

    if(!newUser?.data?.insert_users_one?.id) {
        response.status(400).send({
            code: "AUTH",
            message: 'Hasura User Id is missing!'
        });
        return;
    }

    try {
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        const uid = decodedToken.uid;

        await admin.auth().setCustomUserClaims(uid, {
                "https://hasura.io/jwt/claims": {
                    "x-hasura-allowed-roles": ["user"],
                    "x-hasura-default-role": "user",
                    "x-hasura-user-id": newUser?.data?.insert_users_one?.id,
                },
            }
        );
        logger.info(`Custom claims set for user: ${uid}`);
        response.send({
            message: `Custom claims set for user: ${uid}`
        });
    } catch (error) {
        response.status(500).send({
            code: "INTERNAL_SERVER_ERROR",
            message: 'Error while registering',
            error
        });
    }
};
