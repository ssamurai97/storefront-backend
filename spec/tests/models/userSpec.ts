import { UserStore} from "../../../src/models/user";
import {wait} from "../../../src/lib/wait";


const store = new UserStore();

describe("User Model", () => {
  beforeAll(async () => {
    const result = await store.create({
      id: 1,
      first_name: "Riak",
      last_name: "madit",
      password: "password!"
    })
  })
  it("should have an index method", () => {
    expect(store.index).toBeDefined();
  });

  it("should have a show method", () => {
    expect(store.show).toBeDefined();
  });

  it("should have a create method", () => {
    expect(store.create).toBeDefined();
  });

  it('should return all users', async () =>{
     const users = await store.index()
    expect(users.length).toBeGreaterThanOrEqual(1)
  });

  it('should return a single user', async () => {
    const user = await store.show(String(1))
    await  wait(1000)
    expect(user.last_name).toBe("madit")
  })

});
