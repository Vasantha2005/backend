const express = require("express");
const app = express();
const path = require("path");

const userRoutes = require("./routes/userRoutes");
const journalRoutes = require("./routes/journalRoutes");

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");

const sequelize = require("./config/db");

// ✅ Middleware: Order matters
app.use(express.urlencoded({ extended: true })); // For form submissions
app.use(express.json()); // For JSON payloads
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // Serve uploaded images

// ✅ Routes
app.use("/api/users", userRoutes);
app.use("/api/journals", journalRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ✅ Start server
const PORT = 5000;
sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("✅ Database connected & synced");
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(`📚 Swagger docs at http://localhost:${PORT}/api-docs`);
    });
  })
  .catch((err) => console.error("❌ DB error:", err));
