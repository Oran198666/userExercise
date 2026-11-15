import z from "zod"
import { ClientError } from "./clientError";
import { StatusCode } from "./enum";

const UserSchema = z.object({
    firstName: z.string().min(2).max(50),
    lastName: z.string().min(2).max(50),
    email: z.string().email().max(100),
    password: z.string().min(6).max(100)
});

export class UserModel {
    public id?: number;
    public firstName: string;
    public lastName: string;
    public email: string;
    public password?: string;
    public roleId?: number;

    public constructor(user: UserModel) {
        this.id = user.id;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
        this.password = user.password;
        this.roleId = user.roleId;
    }

    public validate(): void {
        const result = UserSchema.safeParse(this);
        if (!result.success) {
            const message = result.error.issues.map(i => `${i.path.join(".")}: ${i.message}`).join(", ");
            throw new ClientError(StatusCode.UnprocessableEntity, message);
        }
    }
}