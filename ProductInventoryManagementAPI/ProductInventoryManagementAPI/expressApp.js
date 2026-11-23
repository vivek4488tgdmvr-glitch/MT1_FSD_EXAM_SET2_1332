const express = require("express");

const app = express();

app.use(express.json());

// Initial product records stored in memory.
let products = [
    {
        id: 301,
        name: "Wireless Mouse",
        category: "Electronics",
        price: 799,
        quantity: 25,
        inStock: true
    },
    {
        id: 302,
        name: "Notebook",
        category: "Stationery",
        price: 60,
        quantity: 100,
        inStock: true
    },
    {
        id: 303,
        name: "USB Keyboard",
        category: "Electronics",
        price: 999,
        quantity: 0,
        inStock: false
    }
];

let nextId = 304;

// Check the fields required for creating or updating a product.
function validateProduct(data) {
    if (!data || typeof data !== "object" || Array.isArray(data)) {
        return "Request body must be a JSON object";
    }

    if (typeof data.name !== "string" || !data.name.trim()) {
        return "Name is required";
    }

    if (typeof data.category !== "string" || !data.category.trim()) {
        return "Category is required";
    }

    if (
        typeof data.price !== "number" ||
        !Number.isFinite(data.price) ||
        data.price < 0
    ) {
        return "Price must be a valid non-negative number";
    }

    if (
        typeof data.quantity !== "number" ||
        !Number.isInteger(data.quantity) ||
        data.quantity < 0
    ) {
        return "Quantity must be a non-negative integer";
    }

    if (typeof data.inStock !== "boolean") {
        return "inStock must be true or false";
    }

    return null;
}

// GET all products.
app.get("/api/products", (req, res) => {
    res.status(200).json(products);
});

// POST a new product.
app.post("/api/products", (req, res) => {
    const error = validateProduct(req.body);

    if (error) {
        return res.status(400).json({ message: error });
    }

    const newProduct = {
        id: nextId++,
        name: req.body.name.trim(),
        category: req.body.category.trim(),
        price: req.body.price,
        quantity: req.body.quantity,
        inStock: req.body.inStock
    };

    products.push(newProduct);

    res.status(201).json({
        message: "Product added successfully",
        product: newProduct
    });
});

// Filter products by category.
// Keep this route before /:id so "filter" is not treated as an ID.
app.get("/api/products/filter", (req, res) => {
    const category = req.query.category;

    if (typeof category !== "string" || !category.trim()) {
        return res.status(400).json({
            message: "Please provide a category"
        });
    }

    const filteredProducts = products.filter(
        product =>
            product.category.toLowerCase() === category.trim().toLowerCase()
    );

    res.status(200).json(filteredProducts);
});

// GET one product by ID.
app.get("/api/products/:id", (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
        return res.status(400).json({ message: "Invalid product ID" });
    }

    const product = products.find(item => item.id === id);

    if (!product) {
        return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
});

// PUT (replace) a product using the supplied JSON fields.
app.put("/api/products/:id", (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
        return res.status(400).json({ message: "Invalid product ID" });
    }

    const index = products.findIndex(item => item.id === id);

    if (index === -1) {
        return res.status(404).json({ message: "Product not found" });
    }

    const error = validateProduct(req.body);

    if (error) {
        return res.status(400).json({ message: error });
    }

    const updatedProduct = {
        id,
        name: req.body.name.trim(),
        category: req.body.category.trim(),
        price: req.body.price,
        quantity: req.body.quantity,
        inStock: req.body.inStock
    };

    products[index] = updatedProduct;

    res.status(200).json({
        message: "Product updated successfully",
        product: updatedProduct
    });
});

// DELETE a product.
app.delete("/api/products/:id", (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
        return res.status(400).json({ message: "Invalid product ID" });
    }

    const index = products.findIndex(item => item.id === id);

    if (index === -1) {
        return res.status(404).json({ message: "Product not found" });
    }

    const deletedProduct = products.splice(index, 1)[0];

    res.status(200).json({
        message: "Product deleted successfully",
        product: deletedProduct
    });
});

// Handle unknown API routes.
app.use((req, res) => {
    res.status(404).json({ message: "API endpoint not found" });
});

// Handle invalid JSON and unexpected errors.
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
        return res.status(400).json({ message: "Invalid JSON format" });
    }

    res.status(500).json({ message: "Internal server error" });
});

module.exports = app;
