import express,{ Response,Request} from "express";


export const catchErrors = (fn: Function) =>{
    return function (req: Request, res: Response, next: express.NextFunction){
        return fn(req, res, next);
    }
}
