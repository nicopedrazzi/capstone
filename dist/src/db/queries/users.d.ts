import { Newuser } from "../schema";
export declare function addUser(user: Newuser): Promise<{
    id: number;
    email: string;
    name: string;
    surname: string;
    passwordHash: string;
    createdAt: Date;
    updatedAt: Date;
} | undefined>;
