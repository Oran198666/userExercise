import { StatusCode } from "./enum";


export class ClientError extends Error{
    public readonly status: StatusCode;


    public constructor(status: StatusCode, message: string){
        super(message);
        this.status = status;
    }
}

