import supertest from "supertest";

import app from '../../../src/app'
import { UserStore} from "../../../src/models/user";
import jwt from 'jsonwebtoken'
const request = supertest(app)
let token: string;

describe("user endpoint response test suite", () => {
    beforeAll(() => {
        spyOn(UserStore.prototype, "index").and.returnValue(
            Promise.resolve([
                {
                  id: 1,
                  first_name: "Deng" ,
                  last_name: "Chol",
                  password: "password"
                },
            ])
        );
        spyOn(UserStore.prototype, "show").and.returnValue(
            Promise.resolve({
                id: 1,
                first_name: "Deng" ,
                last_name: "Chol",
                password: "password"
            })
        );
        spyOn(UserStore.prototype, "create").and.returnValue(
            Promise.resolve({
                id: 1,
                first_name: "Deng" ,
                last_name: "Chol",
                password: "password"
            })
        )
    })



    it("post user creation endpoint", async () => {
        const res = await request.post("/users").
            send({
            id: 1,
            first_name: "Deng",
            last_name: "Chol",
            password: "password"
        }).set('Accept', 'application/json');
        token = "Bearer" + res.body;
        expect(res.status).toBe(200);
    });
// it("get all users index endpoint", async () => {
//     const res = await request
//         .get("/users")
//         .set("Authorization", "Bearer " + token);
//     expect(res.status).toBe(200);
//     expect(res.body).toEqual([
//         {
//             id: 1,
//             first_name: "Deng",
//             last_name: "Chol",
//             password: "password",
//         },
//     ]);
// });

// it("get specific users show endpoint", async () => {
//     const res = await request
//         .get("/users/1")
//         .set("Authorization", "Bearer " + token);
//     expect(res.status).toBe(200);
//     expect(res.body).toEqual({
//         id: 1,
//         first_name: "Deng",
//         last_name: "Chol",
//         password: "password",
//     });
// });

})


