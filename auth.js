import jwt from "jsonwebtoken";

export default async function (req, res, next) {
  try {
    const userData = await decryptAndVerifyToken(req);
    next();
  } catch (err) {
    res.sendStatus(401);
  }
}

export const decryptAndVerifyToken = async (req) => {
  const token = await req.headers.authorization.split(" ")[1];

  const userData = jwt.verify(token, "skibidi");

  return userData;
};
