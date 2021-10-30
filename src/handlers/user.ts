
import express,{Response, Request, Application} from "express";
import {v4 as uuid } from 'uuid'
import { User, UserStore} from "../models/user";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const store: UserStore = new UserStore();

export const index = async(req: Request, res: Response) => {
    const users = await store.index();
    res.json(users)
}

export const show = async (req: Request, res: Response) => {
    const id = await store.show(req.params.id);

    if(!id){
     return res.status(401).send({message: "No user Found!"});
    }
    res.json(id)
}

export const create = async (req: Request, res: Response) =>{
    try {
        const user: {
            id: number
            first_name: string,
            last_name: string,
            password: string
        } = {
            id: Number(uuid()),
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            password: req.body.password
        };

        const newUser = await store.create(user)

        const token = jwt.sign({user: newUser}, process.env.TOKEN_SECRET as string)

        res.json(token)
    }catch (err){
        res.json(err)
    }
}

