import express from "express";
import cors from "cors";
import helmet from "helmet";
import path from "path";
require("dotenv").config();
require("./db/mongoose");
const { userRouter } = require("./routers/user-router");
const { taskRouter } = require("./routers/task-router");
const { farmRouter } = require("./routers/farm-router");
const { livestockRouter } = require("./routers/livestock-router");

const app = express();

/* bundle.js */
app.use(express.static(path.join(__dirname, "../../dist")));

// Set up middleware
app.use(express.json());
app.use(cors());
app.use(helmet());

/* index.html */
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../../dist", "index.html"));
});

app.post("/test", (req, res) => {
  console.log("here -->", req.body);
  res.send("Success");
});

// Set up routes
app.use(userRouter);
app.use(taskRouter);
app.use(farmRouter);
app.use(livestockRouter);

export default app;
