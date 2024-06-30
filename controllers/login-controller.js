import _knex from "knex";
import knexfile from "../knexfile.js";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const knex = _knex(knexfile);

export default async function (req, res) {
  const { email, password } = req.body;

  try {
    try {
      if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        throw new Error("Invalid Email.");
      }

      if (password.trim().length < 8) {
        throw new Error("Invalid Password");
      }
    } catch (err) {
      res.status(401).send(err.message);
      return;
    }
    const data = await knex("property_admin")
      .where("email_address", email.toUpperCase())
      .first();

    if (!data) {
      res.status(401).send({
        message: "User doesn't exist. Please contact administrator.",
      });
      return;
    }

    bcrypt
      .compare(password, data.password)
      .then(async (result) => {
        if (result) {
          const token = await jwt.sign(
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
    res.status(500).send("Invalid fields.");
  }
}
