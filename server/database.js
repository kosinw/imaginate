const mongoose = require("mongoose"); // library to connect to MongoDB

const connect = () => {
  // Server configuration below
  const mongoConnectionURL =
    "mongodb+srv://admin:kjePoYiJrW1KmEaZ@cluster0.pnm5o.mongodb.net/imaginate?retryWrites=true&w=majority";
  const databaseName = "imaginate";

  // enable virtuals
  mongoose.set("toJSON", { virtuals: true });

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
