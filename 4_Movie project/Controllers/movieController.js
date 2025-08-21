const movieModel = require("../Models/movieModel");

exports.createMovie = async (req, res) => {
    try {
        const { title, description, image } = req.body;
        const img = req.file.filename;

        const movie = movieModel.create({
            title,
            description,
            image: img
        })

        if (movie) {
            res.status(201).json({ message: "Movie created", movie });
        } else {
            res.status(400).json({ message: "Failed to create movie" });
        }

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getMovies = async (req, res) => {
    try {
        const movies = await movieModel.find();
        if (movies.length === 0) {
            return res.status(404).json({ message: "No movies found" });
        } else {
            res.status(200).json({ message: "Movies retrieved", movies });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getMovie = async (req, res) => {
    try {
        const { id } = req.params;
        const movie = await movieModel.findById(id);
        if (!movie) {
            return res.status(404).json({ message: "Movie not found" });
        } else {
            res.status(200).json({ message: "Movie retrieved", movie });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateMovie = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, image } = req.body;

        const movie = await movieModel.findById(id);
        if (!movie) {
            res.status(404).json({ message: "Movie not found" });
        }

        if (req.file && movie.image) {
            const fs = require('fs');
            const path = require('path');
            const oldImgPath = path.join(__dirname, '..', 'uploads', movie.image);

            if (fs.existsSync(oldImgPath)) {
                fs.unlinkSync(oldImgPath);
            }
        }

        await movieModel.findByIdAndUpdate(id, {
            title,
            description,
            image: req.file.filename
        });

        res.status(200).json({ message: "Movie updated successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteMovie = async (req, res) => {
    try {
        const {id} = req.params;
        const movie = await movieModel.findByIdAndDelete(id);
        if (!movie) {
            return res.status(404).json({ message: "Movie not found" });
        }
        res.status(200).json({ message: "Movie deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
