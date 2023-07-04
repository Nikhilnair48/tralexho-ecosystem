import { faker } from "@faker-js/faker";

export const productFactory = {
  id: faker.string.uuid(),
  name: faker.string.alpha(),
  location: faker.location.city(),
  owner: faker.person.firstName(),
  quantityInGrams: faker.number.int(),
};
