/* eslint-disable */
require('dotenv').config();

const fs = require('fs');
const fetch = require('node-fetch');

const swaggerFilePath = './swagger-schema.json';

async function fetchSwaggerSchema() {
  return fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}swagger/?format=openapi`)
    .then((response) => response.json())
    .then((data) => {
      fs.writeFileSync(swaggerFilePath, JSON.stringify(data), 'utf8');
    });
}

async function main() {
  fetchSwaggerSchema();
}

main();

module.exports = {
  swaggerFilePath,
}
