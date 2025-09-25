const fs = require("fs");
const path = require("path");
const { json } = require("../model/data.json");

const dataPathFile = path.join(__dirname, "../model/data.json");

const readProducts = () => {
  const data = fs.readFileSync(dataPathFile, "utf8");
  return JSON.parse(data);
};

const writeProducts = (Products) => {
  fs.writeFileSync(dataPathFile, JSON.stringify(Products, null, 2));
};
const getAllProducts = (req, res) => {
  const products = readProducts();
  res.json(products);
};
const getProductById = (req, res) => {
  const id = parseInt(req.params.id);
  const products = readProducts();
  const product = products.find((p) => p.id === id);

  if (!product) {
    return res.status(404).json({ message: "Product Not Found" });
  }
  res.json(product);
};
const postProduct = (req, res) => {
  const product = readProducts();
  const newProduct = req.body;
  newProduct.id = product.length ? product[product.length - 1].id + 1 : 1;
  product.push(newProduct);
  writeProducts(product);
  res.status(201).json({ message: "Product Crated", product: newProduct });
};

const updateProductById = (req, res) => {
  const id = parseInt(req.params.id);
  const products = readProducts();
  const productIndex = products.findIndex((p) => p.id === id);

  if (productIndex === -1) {
    return res.status(404).json({ message: "Product not found" });
  }

  products[productIndex] = { ...products[productIndex], ...req.body };
  writeProducts(products);

  res.json({ message: "Product updated", product: products[productIndex] });
};

const deleteProductById = (req, res) => {
  const id = parseInt(req.params.id);
  const products = readProducts();
  const productIndex = products.findIndex((p) => p.id === id);

  if (productIndex === -1) {
    return res.status(404).json({ message: "Product not found" });
  }

  products.splice(productIndex, 1);
  writeProducts(products);
  res.json({ message: `Product with id ${id} deleted successfully` });
};

const getPOPULARINWOMEN = (req, res) => {
  const products = readProducts();
  const data = products.filter((product) => product.category === "women");
  res.json(data);
};
const getNewColletion = (req, res) => {
  const products = readProducts();
  const data = products
    .filter((product) => product.category === "kids")
    .slice(0, 8);
  res.json(data);
};
const getMansCollection=(req,res)=>{
  const products=readProducts();
  
  const data=products.filter((product)=>product.category==="men")
  res.json(data);
}

module.exports = {
  getAllProducts,
  getProductById,
  getMansCollection,
  postProduct,
  updateProductById,
  deleteProductById,
  getPOPULARINWOMEN,
  getNewColletion,
};
