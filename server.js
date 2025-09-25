const express = require("express");
const productRoutes = require("./routes/productRoutes");
const cors = require("cors");

const app = express();
const PORT = 5000;


app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.static("public"));
app.use(express.json());

// Route base: /api/products
app.use("/api/products", productRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
