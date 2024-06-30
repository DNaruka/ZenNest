import _knex from "knex";
import knexfile from "../knexfile.js";

import { decryptAndVerifyToken } from "../auth.js";

const knex = _knex(knexfile);

export const getProperties = async (req, res) => {
  const userData = await decryptAndVerifyToken(req);

  const data = await knex("property")
    .innerJoin(
      "property_admin",
      "property.property_id",
      "property_admin.property_id"
    )
    .where("property_admin.admin_id", userData.adminId);

  res.status(200).send(data);
};

export const getProperty = async (req, res) => {
  const propertyId = req.params.propertyId;

  try {
    if (!Number.isInteger(+propertyId)) throw new Error("Invalid Property Id");

    const userData = await decryptAndVerifyToken(req);

    const data = await knex("property")
      .innerJoin(
        "property_admin",
        "property.property_id",
        "property_admin.property_id"
      )
      .where("property_admin.admin_id", userData.adminId)
      .where("property.property_id", propertyId);

    if (data.length === 0) {
      return res.status(401).send("Unauthorized to view property");
    }

    res.status(200).send(data);
  } catch (err) {
    res.status(400).send(err.message);
  }
};
