const path = require("path");
const dotenv = require("dotenv");
dotenv.config();

module.exports = {
    rootPath: path.resolve(__dirname, '..'), 
    serviceName: process.env.SERVICE_NAME,
    secretKey: process.env.SECRET_KEY,
    DB: process.env.MONGO_URL
}