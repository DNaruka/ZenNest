import bcrypt from "bcrypt";

const saltRounds = 10;
const password = "user_password";

const salt = await new Promise((resolve, reject) => {
  bcrypt.genSalt(saltRounds, (err, salt) => {
    if (err) reject(err);
    resolve(salt);
  });
});

const hashedPassword = await new Promise((resolve, reject) => {
  bcrypt.hash(password, salt, (err, hash) => {
    if (err) reject(err);
    resolve(hash);
  });
});

bcrypt.compare("user_password", hashedPassword, (err, result) => {
  if (err) {
    console.log("Error processing password");
  }

  if (result) {
    console.log("Password matched");
  } else {
    console.log("Password mismatch");
  }
});
