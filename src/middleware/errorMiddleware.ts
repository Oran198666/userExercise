import { NextFunction, Request, Response } from "express";

class ErrorMiddleware{
    public catchAll(err:any, request:Request,response:Response,next:NextFunction){
        const status = err.status || 500;
        console.log(status, err.message);
        response.status(status).json({json:err.message});
    }
}

export const errorMiddleware = new ErrorMiddleware();