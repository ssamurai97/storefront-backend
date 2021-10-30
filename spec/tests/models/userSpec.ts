import { UserStore} from "../../../src/models/user";
import {wait} from "../../../src/lib/wait";
import {v4 as uuid } from 'uuid'

const store = new UserStore();

describe("User Model", () => {
  beforeAll(async () => {
    const result = await store.create({
      id: Number(uuid()),
      first_name: "Deng",
      last_name: "Chol",
      password: "password",
    });
  });
  it("should have an index method", () => {
    expect(store.index).toBeDefined();
  });

  it("should have a show method", () => {
    expect(store.show).toBeDefined();
  });

  it("should have a create method", () => {
    expect(store.create).toBeDefined();
  });
  it("should create a user", async () => {
    const result = await store.create({
      id: Number(uuid()),
      first_name: "Riak",
      last_name: "Chan",
      password: "password123",
    });
    await wait (500);
    expect(result.first_name).toEqual("Riak");
    expect(result.last_name).toEqual("Chan");
  });
  it("should only return single user", async () => {
    const result = await store.show("1");
    await wait(1000);
    expect(result.first_name).toEqual("Deng");
    expect(result.last_name).toEqual("Chol");
  });
  it("should return all users", async () => {
    const result = await store.index();
    await wait(3000);
    expect(result.length).toBeGreaterThanOrEqual(1);
  });
});
