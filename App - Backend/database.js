// const mongoose = require("mongoose");
// require("dotenv").config();

// const mongoUrl = process.env.mongoUrl;

// // // const username = encodeURIComponent("udaysinghtohana9");
// // const username = encodeURIComponent("udaysinghtohana9")
// // const password = encodeURIComponent("shivbaba@123");
// // const cluster = "cluster0.vimqh.mongodb.net"
// // const authSource = "retryWrites=true"
// // const authMechanism = "w=majority"

// // const mongoUrl =  `mongodb+srv://${username}:${password}@${cluster}/noteapp?authSource=${authSource}&authMechanism=${authMechanism}`;

// const connection = mongoose.connect(mongoUrl).then(() => {
//     console.log("Connected to MongoDB");
//   })
//   .catch((error) => {
//     console.error("Error connecting to MongoDB:", error);
//   });

// module.exports = {
//   connection,
// };




const mongoose = require("mongoose");
require("dotenv").config();


const username = encodeURIComponent("udaysinghtohana9");
const password = encodeURIComponent("Shivbaba@123");

const mongoUrl = `mongodb+srv://${username}:${password}@cluster0.vimqh.mongodb.net/noteapp?retryWrites=true&w=majority`;

// const mongoUrl = process.env.mongoUrl;

// Check if mongoUrl is defined
if (!mongoUrl) {
  console.error("MongoDB connection URL is not defined.");
} else {
  // Attempt to connect to MongoDB
  mongoose
    .connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((error) => {
      console.error("Error connecting to MongoDB:", error);
    });
}

module.exports = {
  mongoose, // Optionally export mongoose for other modules
};
