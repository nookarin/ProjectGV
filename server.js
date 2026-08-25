import express from "express";
import { MongoClient, ObjectId } from "mongodb";

const PORT = process.env.PORT || 3000;
const URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017";
const DB_NAME = "gearverse";

const client = new MongoClient(URI);
await client.connect();
console.log("+ connected to MongoDB");

const db = client.db(DB_NAME);
const app = express();

app.use(express.json());
app.use((req, res, next) => {
  res.set("Access-Control-Allow-Origin", "*");
  next();
});
app.use(express.static("client"));

app.get("/api/products", async (req, res) => {
  try {
    const { category, limit } = req.query;
    const filter = {};
    if (category) {
      const cat = await db.collection("categories").findOne({ category_name: category });
      if (!cat) return res.status(400).json({ error: `Unknown category: ${category}` });
      filter.category_id = cat._id;
    }
    let query = db.collection("products").find(filter);
    if (limit) query = query.limit(parseInt(limit, 10));
    const products = await query.toArray();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/products/:id", async (req, res) => {
  try {
    const product = await db
      .collection("products")
      .findOne({ _id: new ObjectId(req.params.id) });
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`+ server running at http://localhost:${PORT}`);
});
