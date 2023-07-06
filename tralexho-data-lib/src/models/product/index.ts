import { prop, getModelForClass } from "@typegoose/typegoose";

class Product {
  @prop({ required: true })
  id!: string;

  @prop({ required: true })
  name!: string;

  @prop({ required: true })
  location!: string;

  @prop({ required: true })
  owner!: string;

  @prop({ required: true })
  quantityInGrams!: number;
}

export const ProductModel = getModelForClass(Product);
