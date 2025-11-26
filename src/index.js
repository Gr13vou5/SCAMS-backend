const express = require('express');
const dotenv = require('dotenv');
const { default: mongoose } = require('mongoose');
const authRoutes = require("./routes/auth.routes");
const { swaggerUi, swaggerSpec } = require("./config/swagger");
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use((err, req, res, next) => {
  console.error("GLOBAL ERROR HANDLER:", err && (err.stack || err));
  const message = err && err.message ? err.message : String(err || "Unknown error");
  res.status(err && err.statusCode ? err.statusCode : 500).json({ message });
});
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

mongoose.connect(`${process.env.MONGO_DB}`).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB:', err);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});