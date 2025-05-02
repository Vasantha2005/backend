const swaggerJSDoc = require("swagger-jsdoc");
require("dotenv").config();

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Travel Journal API",
      version: "1.0.0",
      description: "API for user registration and travel journal posting (Updated)",
    },
    servers: [
      {
        url: process.env.BASE_URL || "http://localhost:5000",
        description: "API Server",
      },
    ],
    components: {
      schemas: {
        UserSignup: {
          type: "object",
          required: ["name", "email", "password"],
          properties: {
            name: { type: "string" },
            email: { type: "string", format: "email" },
            password: { type: "string", format: "password" },
          },
        },
        Journal: {
          type: "object",
          required: ["title", "description", "date"],
          properties: {
            id: { type: "integer", description: "Unique identifier" },
            title: { type: "string" },
            description: { type: "string" },
            date: { type: "string", format: "date" },
            images: {
              type: "array",
              items: { type: "string", format: "uri" }, // assuming URLs
              description: "List of image URLs",
            },
          },
        },
      },
    },
  },
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
