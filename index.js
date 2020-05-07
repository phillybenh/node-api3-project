// configures for .env - for Thursday stretch
require('dotenv').config(); 
const chalk = require('chalk');
const server = require('./server.js');

const port = process.env.PORT || 4000;

server.listen(port, () => {
    console.log(chalk.bgGreen.black.bold(`** Server Running on http://localhost:${port} **`));
});