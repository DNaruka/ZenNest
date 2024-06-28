import propertyAdmins from '../seed_data/property_admins.js';
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('property_admin').del()
  await knex('property_admin').insert(propertyAdmins);
};
