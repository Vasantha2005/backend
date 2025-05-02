const swaggerJSDoc = require('swagger-jsdoc');

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
        url: "https://backend-production-75fa.up.railway.app", // ✅ Use your live server URL
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
              items: { type: "string", format: "binary" },
              description: "List of image URLs or uploaded image files",
            },
          },
        },
      },
    },
  },
  apis: ["./routes/*.js"], // Path to your routes
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
