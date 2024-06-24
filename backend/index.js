import express from "express";
import authRouter from "./src/modules/auth/auth.router.js";
import categoryRouter from "./src/modules/category/category.router.js";
import bookRouter from "./src/modules/book/book.router.js";
import cartRouter from "./src/modules/cart/cart.router.js";
import { globalErrorHandling } from "./src/utils/errorHandling.js";
import connectToDatabase from "./src/DB/connection.js";
import cookieParser from "cookie-parser";

import { config } from "dotenv";
import cors from "cors";

const app = express();
config();
connectToDatabase();


app.use(cors({
  origin:"http://localhost:5173",
  credentials:true
}));
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/category", categoryRouter);
app.use("/api/book", bookRouter);
app.use("/api/cart", cartRouter);

app.use(globalErrorHandling);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is Working on port => ${port}`));
