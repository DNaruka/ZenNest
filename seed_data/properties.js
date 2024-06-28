import { faker } from "@faker-js/faker";

const data = [];

for (let i = 1; i <= 30; i++) {
  data.push({
    name: faker.location.city() + faker.location.county(),
    postal_code: faker.location.zipCode(),
    location: `${faker.location.streetAddress()}\n${faker.location.city()}, ${
      faker.location.state()
    }`,
    max_floors: faker.helpers.rangeToNumber({ min: 4, max: 23 }),
  });
}

export default data;