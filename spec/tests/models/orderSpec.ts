import {productStore} from "../../../src/models/product";
import {OrderStore} from "../../../src/models/orders";
import {wait} from "../../../src/lib/wait";
import {UserStore} from "../../../src/models/user";
import { v4 as uuid } from 'uuid'


const store = new OrderStore;
describe("Order Model check if the methods exist", () => {
  it("should have an index method", () => {
    expect(store.index).toBeDefined();
  });

  it("should have a show method", () => {
    expect(store.show).toBeDefined();
  });

  it("should have a create method", () => {
    expect(store.create).toBeDefined();
  });
});

describe("Order Model crud method test suites", () => {
  const product = new productStore();
  const user = new UserStore()

  beforeAll(async () => {
    await user.create({
      id: Number(uuid()),
      first_name: "Deng",
      last_name: "madit",
      password: "password123",
    });
    await product.create({
      id: Number(uuid()),
      name: "pen",
      price: 2,
      category: "stationery",
    });
    await store.create({
      id: Number(uuid()),
      user_id: "1",
      status: "active",
    });
  });

  it("create order test", async () => {
    const result = await store.create({
      id: Number(uuid()),
      user_id: "1",
      status: "active",
    });
    await wait(2000);
    expect(result.status).toEqual("active");
  });
  it("show method should return single order", async () => {
    const result = await store.show("1");
    await wait(3000);
    expect(result.status).toEqual("active");
  });
  it("index method should return all orders", async () => {
    const result = await store.index();
    await wait(3000);
    expect(result.length).toBeGreaterThanOrEqual(1);
  });
  it("add product to order", async () => {
    const result = await store.addProduct(2, "1", "1");
    await wait(2000);
  });
});
