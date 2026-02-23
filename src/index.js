import express from "express";
import cors from "cors";
import contactRoute from "./routes/contact.js";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
dotenv.config();

const app = express();

const isProd = process.env.NODE_ENV === "production";

app.use(
  cors({
    origin: isProd
      ? ["https://yusanggon-portfolio.uk"]
      : ["http://localhost:5173"],
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  }),
);
// app.options("*", cors());
app.use(express.json());

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  skip: () => process.env.NODE_ENV !== "production",
});

app.use("/api", limiter);

app.use((req, res, next) => {
  console.log("[REQ]", req.method, req.url);
  next();
});
app.get("/ping", (_, res) => res.send("pong"));
app.use("/api/contact", contactRoute);
const PORT = process.env.PORT || 5050;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
