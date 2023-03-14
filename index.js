import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import dbConnect from "./models/db.js";
import userRouter from "./routers/userRouter.js";
import categoryRouter from "./routers/categoryRouter.js";
import prodectRouter from "./routers/prodectRouter.js";
import homeRouter from "./routers/homeRoute.js";
import stripeRouter from "./routers/stripeRouter.js";
import orderRouter from "./routers/orderRouter.js";
import reviewRouter from "./routers/reviewRouter.js";

//INIT APP
const app = express();

//ENV CONFIGE
dotenv.config();

//DB CONNECT
dbConnect();

app.use(cors());

//PORT
const port = process.env.PORT || 5050;

app.post(
  "/api/prament/webhook",
  express.json({
    verify: (req, res, buf) => {
      req.rawBody = buf.toString();
    },
  })
);

//MIDDLEWAAR
app.use(express.json());
app.use(express.static("public/upload"));

//ROUTER
app.use("/api/user", userRouter);
app.use("/api/category", categoryRouter);
app.use("/api/prodect", prodectRouter);
app.use("/api/home", homeRouter);
app.use("/api/prament", stripeRouter);
app.use("/api/order", orderRouter);
app.use("/api/review", reviewRouter);

//SERVER
app.listen(port, () => {
  console.log(`server is raning on the port is ${port}`);
});
