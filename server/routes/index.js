const express = require('express')
const app = express();

app.use(require('./resetpass'));
app.use(require('./mail'));
app.use(require('./ejemplo'));
app.use(require('./usuario'));
app.use(require('./login'));


module.exports = app;