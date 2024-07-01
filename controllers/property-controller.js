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
      .select(
        "property.name",
        "property.postal_code",
        "property.max_floors",
        "property.location"
      )
      .innerJoin(
        "property_admin",
        "property.property_id",
        "=",
        "property_admin.property_id"
      )
      .where("property.property_id", propertyId)
      .andWhere("property_admin.admin_id", userData.adminId);

    if (data.length === 0) {
      return res.status(401).send("Unauthorized to view property");
    }

    const response = {
      name: data[0].name,
      postalCode: data[0].postal_code,
      location: data[0].location,
      maxFloors: data[0].max_floors,
    };

    res.status(200).send(response);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

export const addProperty = async (req, res) => {
  const data = req.body;

  try {
    if (data.name.length < 4) throw new Error("Invalid name");
    if (data.location.length < 8) throw new Error("Invalid location");
    if (data.postalCode.length < 4) throw new Error("Invalid Postal Code");
    if (
      !Number.isInteger(+data.maxFloors) ||
      data.maxFloors < 3 ||
      data.maxFloors > 90
    )
      throw new Error("Invalid Floors");

    const userData = await decryptAndVerifyToken(req);

    const payload = {
      name: data.name,
      max_floors: data.maxFloors,
      postal_code: data.postalCode,
      location: data.location,
    };

    const result = await knex("property").insert(payload);

    const adminDetails = await knex("property_admin")
      .select("email_address", "password", "name", "created_at")
      .where("admin_id", userData.adminId)
      .first();

    await knex("property_admin").insert({
      ...adminDetails,
      property_id: result[0],
      admin_id: userData.adminId,
    });

    res.status(201).send(result);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

export const putProperty = async (req, res) => {
  const newData = req.body;

  const propertyId = req.params.propertyId;

  try {
    if (!Number.isInteger(+propertyId)) throw new Error("Invalid Property Id");

    if (newData.name.length < 4) throw new Error("Invalid name");
    if (newData.location.length < 8) throw new Error("Invalid location");
    if (newData.postalCode.length < 4) throw new Error("Invalid Postal Code");
    if (
      !Number.isInteger(+newData.maxFloors) ||
      newData.maxFloors < 3 ||
      newData.maxFloors > 90
    )
      throw new Error("Invalid Floors");

    const userData = await decryptAndVerifyToken(req);

    const data = await knex("property")
      .innerJoin(
        "property_admin",
        "property.property_id",
        "property_admin.property_id"
      )
      .where("property.property_id", propertyId)
      .andWhere("property_admin.admin_id", userData.adminId);

    if (data.length === 0) {
      return res.status(401).send("Unauthorized to view property");
    }

    const payload = {
      name: newData.name,
      max_floors: newData.maxFloors,
      postal_code: newData.postalCode,
      location: newData.location,
    };
    await knex("property")
      .where("property.property_id", propertyId)
      .update(payload);

    res.status(201).send(newData);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

export const deleteProperty = async (req, res) => {
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
      .where("property.property_id", propertyId)
      .andWhere("property_admin.admin_id", userData.adminId);

    if (data.length === 0) {
      return res.status(401).send("Unauthorized to view property");
    }

    const response = await knex("property")
      .where("property_id", propertyId)
      .del();

    res.sendStatus(200);
  } catch (err) {
    res.status(400).send(err.message);
  }
};
