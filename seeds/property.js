import properties from "../seed_data/properties.js";

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  console.log(properties);
  await knex("property").del();
  await knex("property").insert(properties);
}
