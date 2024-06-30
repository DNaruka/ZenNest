import _knex from "knex";
import knexfile from "../knexfile.js";

import { decryptAndVerifyToken } from "../auth.js";

const knex = _knex(knexfile);

export const getProperties = async (req, res) => {
  const userData = await decryptAndVerifyToken(req);
  console.log(userData);

  const data = await knex("property")
    .innerJoin(
      "property_admin",
      "property.property_id",
      "property_admin.property_id"
    )
    .where("property_admin.admin_id", userData.adminId);

  res.status(200).send(data);
};
