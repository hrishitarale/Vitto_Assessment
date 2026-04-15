const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

const applicationRoutes = require("./routes/applicationRoutes");

app.use("/api", applicationRoutes);

app.get("/", (req, res) => {
  res.send("API is running");
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
