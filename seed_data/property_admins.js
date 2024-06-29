import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";

const data = [];

const defaultPassword = await new Promise((resolve, reject) => {
  bcrypt.hash("pandas", 10, (err, hash) => {
    if (err) reject(err);
    resolve(hash);
  });
});

for (let i = 1; i <= 30; i++) {
  data.push({
    property_id: i,
    name: faker.person.fullName(),
    email_address: faker.internet.email().toUpperCase(),
    password: defaultPassword,
  });
}

export default data;
