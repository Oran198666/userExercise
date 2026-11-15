import express from "express";
import { userController } from "./controllers/userController";
import { errorMiddleware } from "./middleware/errorMiddleware";

class App {
    public start(): void {
        const server = express();
        server.use(express.json());
        server.use(userController.router);
        server.use(errorMiddleware.catchAll);
        server.listen(4000, () => console.log("listening on 4000"));
    }
}



const app = new App();
app.start();