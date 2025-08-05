const bookSchema = require("../Models/bookSchema");

exports.createBook = async (req, res) => {
    try {
        const { name, author, description, price } = req.body;
        const book = await bookSchema.create({ name, author, description, price });

        if (book) {
            res.status(201).json({ message: "Book created successfully", book });
        } else {
            res.status(400).json({ message: "Failed to create book" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

exports.getBooks = async (req, res) => {
    try {
        const books = await bookSchema.find();
        res.status(200).json({ message: "Books fetched successfully", books });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

exports.getBookById = async (req, res) => {
    try {
        const { id } = req.params;
        const book = await bookSchema.findById(id);
        if (book) {
            res.status(200).json({ message: "Book fetched successfully", book });
        } else {
            res.status(404).json({ message: "Book not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

exports.updateBook = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, author, description, price } = req.body;
        const book = await bookSchema.findByIdAndUpdate(id, { name, author, description, price });
        if (book) {
            res.status(200).json({ message: "Book updated successfully", book });
        } else {
            res.status(404).json({ message: "Book not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

exports.deleteBook = async (req, res) => {
    try {
        const { id } = req.params;
        const book = await bookSchema.findByIdAndDelete(id);
        if (book) {
            res.status(200).json({ message: "Book deleted successfully", book });
        } else {
            res.status(404).json({ message: "Book not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}