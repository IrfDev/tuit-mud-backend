require("dotenv").config();
const { logger } = require("./src/Lib/winston");

const dbConnect = require("./src/Lib/db");
const server = require("./src/server");

const listenServer = function () {
  return new Promise((resolve, reject) => {
    server.listen(process.env.PORT, () => {
      resolve();
    });
  });
};

async function main() {
  await dbConnect();
  console.log("DB CONNECTED");
  await listenServer();
  console.log(`SERVER LISTENING ON PORT ${process.env.PORT}`);
}

main()
  .then(() => {
    console.log("api ready");
  })
  .catch((error) => {
    console.error("ERROR", error);
    logger.error("Something wrong", error);
  });
