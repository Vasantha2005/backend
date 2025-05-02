require("dotenv").config();
const { Sequelize } = require("sequelize");

if (!process.env.MYSQL_URL) {
  console.error("❌ Missing environment variable: MYSQL_URL");
  process.exit(1);
}

const sequelize = new Sequelize(process.env.MYSQL_URL, {
  dialect: "mysql",
  logging: false,
});

sequelize
  .authenticate()
  .then(() => console.log("✅ MySQL Database connected successfully"))
  .catch((err) => {
    console.error("❌ Database connection failed:", err);
    process.exit(1);
  });

module.exports = sequelize;

sequelize
  .sync({ alter: true })
  .then(() => console.log("✅ MySQL Tables synced"))
  .catch((err) => console.error("❌ Error syncing tables:", err));
