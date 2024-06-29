import express from "express";
import cors from "cors";

import auth from "./auth.js";
import loginController from "./controllers/login-controller.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.sendStatus(200);
});

app.get("/echo", auth, (_req, res) => {
  console.log(_req);
  res.sendStatus(200);
});

app.post("/login", loginController);

app.listen(3000, () => {
  console.log("Server running at Port: " + 3000);
});
