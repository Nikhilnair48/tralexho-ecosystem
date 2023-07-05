import * as Factory from "factory.ts";
import { faker } from "@faker-js/faker";
import { IProduct } from "../types/product";

export const productFactory = Factory.Sync.makeFactory<IProduct>({
  id: Factory.each(() => faker.string.uuid()), // Ensures a unique id for each product
  name: faker.string.alpha(),
  location: faker.location.city(),
  owner: faker.person.firstName(),
  quantityInGrams: faker.number.int(),
});
