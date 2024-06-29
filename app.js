import express from "express";
import cors from "cors";

import loginController from "./controllers/login-controller.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.sendStatus(200);
});

app.post("/login", loginController);

app.listen(3000, () => {
  console.log("Server running at Port: " + 3000);
});
