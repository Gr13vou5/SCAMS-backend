const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "SCAMS - Smart Campus System API",
      version: "1.0.0",
      description: "API documentation for the Smart Campus System (SCAMS)"
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Local server"
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ]
  },
  apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = { swaggerUi, swaggerSpec };
