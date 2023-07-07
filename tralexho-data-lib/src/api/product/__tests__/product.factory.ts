import * as Factory from "factory.ts";
import { faker } from "@faker-js/faker";
import { IProduct } from "../types";

export const productFactory = Factory.Sync.makeFactory<IProduct>({
  name: faker.string.alpha(),
  location: faker.location.city(),
  owner: faker.person.firstName(),
  quantityInGrams: faker.number.int(),
});
