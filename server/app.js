import express from "express";
const app = express();
const PORT = process.env.PORT || 8000;
import { connectDB } from "./config/database.js";
import bodyParser from "body-parser";
import cors from "cors";
import session from "express-session";
// Routes
import userRoutes from "./routes/userRoutes.js";
import todoRoutes from "./routes/todoRoutes.js";

// DB connection
try {
  connectDB();
} catch (error) {
  console.log("DB ERROR", error);
}

// middlewares.

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

// session
app.use(
  session({
    secret: "anishxYz@",
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

// route

app.use("/api", userRoutes);

app.use("/api", todoRoutes);

app.get("/", (req, res) => {
  res.status(200).json({ respose: "OK" });
});
app.listen(PORT, () => console.log(`Server is running at ${PORT}`));
