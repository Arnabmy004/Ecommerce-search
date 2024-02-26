const express=require("express");
const fs=require('fs');
const app = express();
const port = 3001;

// Task 2: Endpoint to return all products
// Task 4: Endpoint to return products by category
app.get("/", (req, res) => {
  const category = req.query.category;
   if (!category) {
    return res.status(400).send("Category parameter is required");
  }
  fs.readFile("products.json", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Internal Server Error");
    }
    const products = JSON.parse(data);
    const filteredProducts = products.filter(
      (product) => product.category === category,
    );
    if (filteredProducts.length === 0) {
      return res
        .status(404)
        .send("Products not found for the specified category");
    }
    res.json(filteredProducts);
  });
});

// Task 1: Start the server
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  }).on("error", (err) => {
    console.log("Unable to start server:", err);
  });
  