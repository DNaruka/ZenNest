import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.sendStatus(200);
});

app.listen(3000, () => {
  console.log("Server running at Port: " + 3000);
});
