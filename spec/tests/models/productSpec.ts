import { productStore} from "../../../src/models/product";


const store = new productStore();
describe("Product Model check if the methods exist", () => {
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
describe("Product Model crud operations", () => {
  beforeAll(async () => {
    const result = await store.create({
      id: 22,
      name: "pen",
      price: 2,
      category: "stationery",
    });
  });

  it("create method should add a product", async () => {
    const result = await store.create({
      id: 23,
      name: "book",
      price: 3,
      category: "stationery",
    });
    expect(result.name).toEqual("book");
    await store.delete("2");
  });
  it("show method should return the correct product", async () => {
    const result = await store.show("1");
    expect(result.name).toEqual("pen");
  });
  it("index method should return a list of products", async () => {
    const result = await store.index();
    expect(result[0].price).toEqual(2);
  });
});
