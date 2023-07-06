/*
    A representation of the Product table
*/

export interface IProduct {
  id: string;
  name: string;
  location: string;
  owner: string;
  quantityInGrams: number;
}
