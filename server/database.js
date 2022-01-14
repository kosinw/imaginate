const mongoose = require("mongoose"); // library to connect to MongoDB

const connect = () => {
  // Server configuration below
  // TODO change connection URL after setting up your team database
  const mongoConnectionURL =
    "mongodb+srv://admin:kjePoYiJrW1KmEaZ@cluster0.pnm5o.mongodb.net/imaginate?retryWrites=true&w=majority";
  // TODO change database name to the name you chose
  const databaseName = "imaginate";

  // connect to mongodb
  mongoose
    .connect(mongoConnectionURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: databaseName,
    })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log(`Error connecting to MongoDB: ${err}`));

  return mongoose.connection;
}

module.exports = connect;