const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config({ path: "./config/.env" });

const connectDB = require("./config/db");

const authRoutes = require("./routes/auth");
const questionRoutes = require("./routes/questions");
const answerRoutes = require("./routes/answers");

const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, content-type");

res.setHeader("Access-Control-Allow-Headers", "X-Requested-With");

// * Connect to db
connectDB();

// * Parse body middleware
app.use(express.json());

// * Mounting routes
app.use("/api/auth", authRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/answers", answerRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is up and running on PORT`, PORT);
});
