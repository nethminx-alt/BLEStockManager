const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const app = express();
const PORT = process.env.PORT || 3001;

// Paths
const DATA_FILE = path.join(__dirname, "data", "products.json");
const UPLOADS_DIR = path.join(__dirname, "uploads");

// Ensure folders exist
if (!fs.existsSync(path.dirname(DATA_FILE))) {
  fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
}
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// Default seed data
const DEFAULT_PRODUCTS = [
  {
    id: "1",
    name: "Wireless Headphones",
    sku: "WH-001",
    category: "Electronics",
    stock: 45,
    reorder: 15,
    price: 79.99,
    emoji: "🎧",
    image: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Standing Desk",
    sku: "FD-102",
    category: "Furniture",
    stock: 8,
    reorder: 10,
    price: 349.0,
    emoji: "🖥️",
    image: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "3",
    name: "Mechanical Keyboard",
    sku: "KB-220",
    category: "Electronics",
    stock: 32,
    reorder: 12,
    price: 129.0,
    emoji: "⌨️",
    image: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "4",
    name: "Ergonomic Chair",
    sku: "EC-050",
    category: "Furniture",
    stock: 3,
    reorder: 8,
    price: 289.0,
    emoji: "🪑",
    image: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "5",
    name: "USB-C Hub",
    sku: "UH-015",
    category: "Electronics",
    stock: 67,
    reorder: 20,
    price: 39.99,
    emoji: "🔌",
    image: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "6",
    name: "Notebook Pack (5)",
    sku: "NB-005",
    category: "Office Supplies",
    stock: 120,
    reorder: 30,
    price: 12.5,
    emoji: "📓",
    image: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "7",
    name: "LED Desk Lamp",
    sku: "LL-088",
    category: "Office Supplies",
    stock: 0,
    reorder: 10,
    price: 45.0,
    emoji: "💡",
    image: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "8",
    name: "Tool Kit (42pc)",
    sku: "TK-042",
    category: "Tools",
    stock: 14,
    reorder: 5,
    price: 59.99,
    emoji: "🔧",
    image: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "9",
    name: "Cotton T-Shirt",
    sku: "CT-M01",
    category: "Clothing",
    stock: 6,
    reorder: 15,
    price: 24.99,
    emoji: "👕",
    image: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "10",
    name: "Monitor 27\"",
    sku: "MN-270",
    category: "Electronics",
    stock: 11,
    reorder: 8,
    price: 299.0,
    emoji: "🖥️",
    image: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// Load or seed data
function loadProducts() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const raw = fs.readFileSync(DATA_FILE, "utf8");
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error("Error reading products file:", err.message);
  }
  // Seed
  saveProducts(DEFAULT_PRODUCTS);
  return [...DEFAULT_PRODUCTS];
}

function saveProducts(products) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(products, null, 2), "utf8");
}

let products = loadProducts();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(UPLOADS_DIR));

// Multer setup for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOADS_DIR),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase() || ".jpg";
    const name = `${Date.now()}-${uuidv4().slice(0, 8)}${ext}`;
    cb(null, name);
  },
});

const fileFilter = (req, file, cb) => {
  const allowed = ["image/jpeg", "image/png", "image/webp", "image/gif"];
  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only image files (JPEG, PNG, WebP, GIF) are allowed"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

// ============ API Routes ============

// GET all products
app.get("/api/products", (req, res) => {
  res.json(products);
});

// GET single product
app.get("/api/products/:id", (req, res) => {
  const product = products.find((p) => p.id === req.params.id);
  if (!product) return res.status(404).json({ error: "Product not found" });
  res.json(product);
});

// POST create product (with optional image)
app.post("/api/products", upload.single("image"), (req, res) => {
  try {
    const { name, sku, category, stock, reorder, price, emoji } = req.body;

    if (!name || !category) {
      return res.status(400).json({ error: "Name and category are required" });
    }

    const newProduct = {
      id: uuidv4(),
      name: name.trim(),
      sku: (sku || "").trim(),
      category: category.trim(),
      stock: parseInt(stock, 10) || 0,
      reorder: parseInt(reorder, 10) || 0,
      price: parseFloat(price) || 0,
      emoji: (emoji || "📦").trim(),
      image: req.file ? `/uploads/${req.file.filename}` : null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    products.push(newProduct);
    saveProducts(products);
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT update product (with optional image)
app.put("/api/products/:id", upload.single("image"), (req, res) => {
  try {
    const idx = products.findIndex((p) => p.id === req.params.id);
    if (idx === -1) return res.status(404).json({ error: "Product not found" });

    const existing = products[idx];
    const { name, sku, category, stock, reorder, price, emoji, removeImage } = req.body;

    // Handle image removal or replacement
    let image = existing.image;
    if (removeImage === "true" || removeImage === true) {
      // Delete old file if exists
      if (existing.image) {
        const oldPath = path.join(__dirname, existing.image);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      image = null;
    }
    if (req.file) {
      // Delete old file if exists
      if (existing.image) {
        const oldPath = path.join(__dirname, existing.image);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      image = `/uploads/${req.file.filename}`;
    }

    products[idx] = {
      ...existing,
      name: name !== undefined ? name.trim() : existing.name,
      sku: sku !== undefined ? sku.trim() : existing.sku,
      category: category !== undefined ? category.trim() : existing.category,
      stock: stock !== undefined ? parseInt(stock, 10) || 0 : existing.stock,
      reorder: reorder !== undefined ? parseInt(reorder, 10) || 0 : existing.reorder,
      price: price !== undefined ? parseFloat(price) || 0 : existing.price,
      emoji: emoji !== undefined ? (emoji || "📦").trim() : existing.emoji,
      image,
      updatedAt: new Date().toISOString(),
    };

    saveProducts(products);
    res.json(products[idx]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PATCH adjust stock only
app.patch("/api/products/:id/stock", (req, res) => {
  const idx = products.findIndex((p) => p.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: "Product not found" });

  const { delta, stock } = req.body;
  if (stock !== undefined) {
    products[idx].stock = Math.max(0, parseInt(stock, 10) || 0);
  } else if (delta !== undefined) {
    products[idx].stock = Math.max(0, products[idx].stock + (parseInt(delta, 10) || 0));
  } else {
    return res.status(400).json({ error: "Provide delta or stock" });
  }

  products[idx].updatedAt = new Date().toISOString();
  saveProducts(products);
  res.json(products[idx]);
});

// DELETE product
app.delete("/api/products/:id", (req, res) => {
  const idx = products.findIndex((p) => p.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: "Product not found" });

  const product = products[idx];
  // Delete associated image
  if (product.image) {
    const imgPath = path.join(__dirname, product.image);
    if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
  }

  products.splice(idx, 1);
  saveProducts(products);
  res.json({ success: true, id: req.params.id });
});

// GET stats
app.get("/api/stats", (req, res) => {
  const total = products.length;
  const units = products.reduce((s, p) => s + p.stock, 0);
  const low = products.filter((p) => p.stock <= p.reorder).length;
  const value = products.reduce((s, p) => s + p.stock * p.price, 0);
  const categories = [...new Set(products.map((p) => p.category))];

  res.json({ total, units, low, value, categories });
});

// GET export CSV
app.get("/api/export/csv", (req, res) => {
  const header = ["ID", "Name", "SKU", "Category", "Stock", "Reorder Level", "Unit Price", "Total Value", "Status", "Image", "Created At", "Updated At"];
  const rows = products.map((p) => {
    const status = p.stock === 0 ? "Out of Stock" : p.stock <= p.reorder ? "Low Stock" : "In Stock";
    return [
      p.id,
      `"${(p.name || "").replace(/"/g, '""')}"`,
      p.sku || "",
      p.category || "",
      p.stock,
      p.reorder,
      p.price,
      (p.stock * p.price).toFixed(2),
      status,
      p.image || "",
      p.createdAt || "",
      p.updatedAt || "",
    ].join(",");
  });

  const csv = [header.join(","), ...rows].join("\n");
  const filename = `inventory-export-${new Date().toISOString().slice(0, 10)}.csv`;

  res.setHeader("Content-Type", "text/csv");
  res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
  res.send(csv);
});

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", products: products.length, time: new Date().toISOString() });
});

// Error handler for multer
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({ error: "Image too large. Max 5MB." });
    }
    return res.status(400).json({ error: err.message });
  }
  if (err) {
    return res.status(400).json({ error: err.message });
  }
  next();
});

// Start
app.listen(PORT, () => {
  console.log(`\n  StockFlow API running at http://localhost:${PORT}`);
  console.log(`  Health:  http://localhost:${PORT}/api/health`);
  console.log(`  Products: ${products.length} loaded\n`);
});
