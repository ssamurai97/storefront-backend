import supertest from "supertest";

import app from "../../../src/app";

import { OrderStore} from "../../../src/models/orders";

const request = supertest(app)

describe('Order endpoint ', () =>{
   let token: string

    it('authenticate user ', async () => {
        const response = await request.post("/users/authenticate")
            .send({
                last_name: "Chol",
                password: "password123"
            }).set("Accept", "application/json");
        token = "Bearer " + response.body;
    })

    it('should return specific order by ID ' ,async () => {
        const response = await request.get("/orders/2")
        expect(response.status).toBe(200)
    })
})
