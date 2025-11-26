const express = require('express');
const dotenv = require('dotenv');
const { default: mongoose } = require('mongoose');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {    
    res.send('Hello, World! ff');
});

mongoose.connect(`${process.env.MONGO_DB}`).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB:', err);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});