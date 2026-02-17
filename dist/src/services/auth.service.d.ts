export type User = {
    email: string;
    name: string;
    surname: string;
};
export declare function userRegistration(user: User, password: string): Promise<{
    id: number;
    email: string;
    name: string;
    surname: string;
    createdAt: Date;
}>;
