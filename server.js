const express = require("express");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
// const dbconnect = require("./DB/dbconnection");
//const errorHandeler = require("./middleware/errorHanlder");

const app = express();
const port = process.env.PORT || 5000;

// database_connection

// mongoose.connect('mongodb://localhost:27017/new_contacts', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// }).then(() => {
//   console.log('Database Connected Successfully');
// }).catch((error) => {
//   console.error('Database connection error:', error);
// });

 mongoose.connect('mongodb://127.0.0.1:27017/mycontacts',
 { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.json());
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
//app.use(errorHandeler);

app.listen(port,()=>{
console.log(`Server running on the port ${port}`);
});