const bcrypt = require("bcryptjs");

async function main() {
  const password = "ChangeMe123!";

  const hash = await bcrypt.hash(password, 10);

  console.log(hash);
}

main();