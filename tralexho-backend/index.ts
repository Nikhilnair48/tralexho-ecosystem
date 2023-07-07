import express, { Request, Response } from "express";
import { ProductModel, createConnection } from "tralexho-data-lib/dist";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());
app.use(function (_req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

const port = 3001;
createConnection();

app.get("/products", async (req: Request, res: Response) => {
  const products = await ProductModel.find().exec();
  return res.status(200).json(products);
});

app.get("/product", async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await ProductModel.find({ id }).exec();
  return res.status(200).json(product);
});

app.post("/product", async (req: Request, res: Response) => {
  const { name, location, owner, quantityInGrams } = req.body;
  const product = await ProductModel.create({
    id: "abc",
    name,
    location,
    owner,
    quantityInGrams,
  });
  return res.status(200).json(product);
});

app.put("/product/:productId", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, location, owner, quantityInGrams } = req.body;
  const updatedPerson = await ProductModel.findByIdAndUpdate({
    id,
    name,
    location,
    owner,
    quantityInGrams,
  });
  if (updatedPerson) {
    res.json(updatedPerson);
  } else {
    res.status(404).json({ error: "Person not found" });
  }
});

app.delete("/product/:productId", async (req: Request, res: Response) => {
  const { id } = req.params;
  const deletedPerson = await ProductModel.findByIdAndDelete(id).exec();
  if (deletedPerson) {
    res.json({ message: "Person deleted" });
  } else {
    res.status(404).json({ error: "Person not found" });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
