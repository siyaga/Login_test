const express = require('express');
const cors = require('cors');
const sequelize = require('./src/config/database');
const apiRoutes = require('./src/routes/api');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', apiRoutes);

const PORT = process.env.PORT || 3000;

sequelize.sync({ force: false }) 
    .then(() => {
        console.log('Database connected & models synced.');
        app.listen(PORT, () => {
            console.log(`Server is running professionaly on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });