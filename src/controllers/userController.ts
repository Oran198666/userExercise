import express, { NextFunction, Request, Response, Router } from "express";
import { userService } from "../service/userService";
import { array } from "node:stream/iter";
import { json } from "node:stream/consumers";


class UserController {
    //It creates a new, empty Express router instance assigned to a public class property,
    //acting as a isolated container for defining routes.
    public router: Router = express.Router();

    public constructor() {
        this.router.get("/api/users", this.getAllUsers);
        this.router.post("/api/users", this.registerUser);
    }

    private async getAllUsers(request: Request, response: Response): Promise<void> {
        const user = await userService.getAllUsers();
        response.json(user);
    }

    private async registerUser(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            if (Array.isArray(request.body)) {
                const newUsers = await userService.registerManyUsers(request.body);
                response.status(201).json(newUsers);
                return;
            }
            const newUser = await userService.registerUser(request.body);
            response.status(201).json(newUser);
        } catch (err: any) {
            next(err);
        }
    }
}

export const userController = new UserController();