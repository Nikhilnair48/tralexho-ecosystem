import { productFactory } from "./product.factory";

/* 
export const mockEdgeCases = [
  ["product", "errorMessage"],
  [productFactory.build({ id: undefined }), `'id' is a required field`],
  [productFactory.build({ name: undefined }), `'name' is a required field`],
  [
    productFactory.build({ location: undefined }),
    `'location' is a required field`,
  ],
  [productFactory.build({ owner: undefined }), `'owner' is a required field`],
];
 */

// TODO: will fail at the moment. test case to be rewritten once mongo connection is set
test("should throw an error when id is missing", () => {
  expect(() => productFactory.build({ name: undefined })).toThrowError();
});
