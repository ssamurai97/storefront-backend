import supertest from "supertest";
import { UserStore} from "../../../src/models/user";
import app from '../../../src/app'

import {v4 as uuid } from 'uuid'
import {wait} from "../../../src/lib/wait";
const request = supertest(app)


describe("user endpoint response test suite", () => {

    let token: string;
    it('create a user ', async () => {
        const response = await request.post('/users')
            .send({
                first_name: "Chan",
                last_name: "Mach",
                password: "password123"
            }).set("Accept", 'application/json')
        token = "Bearer " + response.body.token;
        expect(response.status).toBe(200)
    })
})

