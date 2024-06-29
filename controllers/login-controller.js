import _knex from "knex";
import knexfile from "../knexfile.js";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const knex = _knex(knexfile);

export default async function (req, res) {
  const { email, password } = req.body;

  try {
    const data = await knex("property_admin")
      .where("email_address", email.toUpperCase())
      .first();

    if (!data) {
      res.status(401).send({
        message: "Email and Password don't match. Please check credentials.",
      });
    }

    bcrypt
      .compare(password, data.password)
      .then((result) => {
        if (result) {
          const token = jwt.sign(
            { ...req.body, propertyId: data["property_id"] },
            "skibidi",
            { expiresIn: "2h" }
          );
          res
            .status(200)
            .send({ message: "Logged In", auth: { email, token } });
        } else {
          res.status(401).send({
            message:
              "Email and Password don't match. Please check credentials.",
          });
        }
      })
      .catch((_err) => {
        res
          .status(500)
          .send("Error processing request. Please check and try again.");
      });
  } catch (err) {
    res.status(500).send("Server Error");
  }
}
