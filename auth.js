import jwt from "jsonwebtoken";

export default async function (req, res, next) {
  try {
    const token = await req.headers.authorization.split(" ")[1];

    const userData = jwt.verify(token, "skibidi");

    res.send(userData);

    next();
  } catch (err) {
    res.sendStatus(500);
  }
}
