import { newProduct } from "./ProductManager.js";
import express from "express";

const app = express();
const PORT = 8080;

app.use(express.urlencoded({ extended: true }));

app.get("/product/:id", async (req, res) => {
  const product = await newProduct.getProductById(parseInt(req.params.id));

  return product
    ? res.status(200).send(product)
    : res.status(404).send({ message: "No se encontró el cliente" });
});

app.get("/products", async (req, res) => {
  const allProducts = await newProduct.getProducts();
  let products;

  if (req.query.limit) {
    products = allProducts.slice(0, req.query.limit);
  } else {
    products = allProducts;
  }

  res.status(200).send(products);
});

app.listen(PORT);
