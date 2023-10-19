const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const routes = require('../routes/index.js');

const app = express();

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Express API',
            version: '1.0.0',
            description: 'A simple Express API',
        },
    },
    apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/', routes);
app.get('/OpenAI', routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`YO MAMA`);
});
