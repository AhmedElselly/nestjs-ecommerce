import { PassportLocalDocument, PassportLocalModel } from "mongoose";

interface UserDocument extends PassportLocalDocument {
    email: string;
    username: string;
}

// export interface User extends PassportLocalDocument<UserDocument> {
//     email: string;
//     username: string;
// }

