import { PassportLocalDocument, PassportLocalModel } from "mongoose";

export interface UserDocument extends PassportLocalModel<PassportLocalDocument> {
    email: string;
    username: string;
}

// export interface User extends PassportLocalDocument<UserDocument> {
//     email: string;
//     username: string;
// }

