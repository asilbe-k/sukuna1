const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

const storage = multer.diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });

app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.post('/api/profile', upload.single('profileImage'), (req, res) => {
    const name = req.body.name;
    const profileImage = req.file ? `/uploads/${req.file.filename}` : null;

    // Save profile data to database (this example assumes you have a database setup)
    res.json({ name, profileImage });
});

app.post('/api/cards', upload.single('cardImage'), (req, res) => {
    const title = req.body.title;
    const cardImage = req.file ? `/uploads/${req.file.filename}` : null;

    // Save card data to database (this example assumes you have a database setup)
    res.json({ title, cardImage });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
