import { onRequest } from 'firebase-functions/v2/https';
import { registerUser } from './auth/register';
import {getUserByPhone} from "./auth/getUserByPhone";

// Export the functions
exports.getUserByPhone = onRequest({cors: true}, getUserByPhone);
exports.registerUser = onRequest({cors: true}, registerUser);

