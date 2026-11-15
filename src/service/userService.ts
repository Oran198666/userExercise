import { UserModel } from "../models/userModel";
import { dal } from "../utils/dal";


class UserService {
    public async getAllUsers(): Promise<any[]> {
        const sql = "SELECT id, firstName, lastName, email, roleId FROM users";
        return await dal.execute(sql) as any[];
    }

    public async registerUser(user: any): Promise<any> {
        const model = new UserModel(user);
        model.validate();

        const sql = "INSERT INTO users (firstName, lastName, email, password, roleId) VALUES (?, ?, ?, ?, ?)";
        const info = await dal.execute(sql, [model.firstName, model.lastName, model.email, model.password, 2]) as any;

        model.id = info.insertId;
        return model;
    }

    public async registerManyUsers(users: any[]): Promise<any[]> {
        const newUsers = [];
        for (const user of users) {
            newUsers.push(await this.registerUser(user));
        }
        return newUsers;
    }
}

export const userService = new UserService();