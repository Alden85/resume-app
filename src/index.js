/*index.js creates the express app and gets it up and running.*/
/*-------------------------------Imports----------------------------*/
const express = require('express');
const app = express();
require('dotenv').config();
//no assignment to variable , will just call the file to connect to db.
require('./db/mongoose');
const userRouter = require('./routers/user');
const profileRouter = require('./routers/profile');

/*-------------------------------Initializing express app------------*/

const port = process.env.PORT || 3001;

//will parse incoming json to object
app.use(express.json());

//Register routers with our express app
app.use(userRouter);
app.use(profileRouter);

/*---------------------------Server Startup---------------------------*/
app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
