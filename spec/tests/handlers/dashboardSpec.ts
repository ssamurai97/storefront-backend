import supertest from "supertest";
import app from "../../../src/app";
import { Dashboard} from "../../../src/services/dashboard";
import {UserStore} from "../../../src/models/user";

const request = supertest(app)


describe('dashboard endpoint to get active orders', () => {
    let token: string
    beforeAll(() => {
        spyOn(Dashboard.prototype, "activeOrders").and.returnValue(Promise.resolve({
            id: 1,
            user_id: "1",
            status: "active"
        }))
    })


})
