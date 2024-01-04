import fs from "fs";
import { products } from "@/data/products";
import { Product } from "@/models/product";

const saveProducts = (products: Product[]) => {
  const strProducts = JSON.stringify(products, null, 2);
  fs.writeFileSync(
    "./src/data/products.ts",
    `export const products = ${strProducts};`,
    "utf-8"
  );
};

export const getAllProducts = () => {
  const data: Product[] = products;
  return data;
};

export const getProduct = (id: string) => {
  const data = products;
  const product = data.find((p) => p.id === parseInt(id));
  return product;
};

export const createProduct = (product: Product) => {
  product.id = products.length + 1;

  let data: Product[] = JSON.parse(JSON.stringify(products));
  data.push({ ...product });

  saveProducts(data);
  return true;
};

export const deleteProduct = (id: string) => {
  let data: Product[] = JSON.parse(JSON.stringify(products));
  const index = data.findIndex((i) => i.id === parseInt(id));
  if (index === -1) {
    return false;
  }

  data.splice(index, 1);
  saveProducts(data);

  return true;
};
