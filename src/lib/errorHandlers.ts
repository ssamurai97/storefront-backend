import express,{ Response,Request} from "express";


export const catchErrors = (fn: Function) =>{
    return function (req: Request, res: Response, next: express.NextFunction){
        return fn(req, res, next);
    }
}


export const handlerError= (fn: Function, err: Error)=>{
    return function (){
        fn().catch(err)
    }
}



