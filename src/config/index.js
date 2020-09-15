if (!process.env.NODE_ENV) {
    require('dotenv').config();
}

module.exports = {
    port: process.env.PORT,
    environment: process.env.NODE_ENV,

    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD,
    dbName: process.env.DB_NAME,
    dbHost: process.env.DB_HOST,

    jwtSecret: process.env.JWT_SECRET,
    passportSecret: process.env.PASSPORT_SECRET
}