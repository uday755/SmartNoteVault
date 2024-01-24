const mongoose = require("mongoose");
const mongoUrl = `mongodb+srv://udaysinghtohana9:shivbaba123@cluster0.vimqh.mongodb.net/noteapp?retryWrites=true&w=majority`;

// "mongodb+srv://<username>:<password>@<clusterName>.mongodb.net/?retryWrites=true&w=majority";

// const mongoUrl = `mongodb+srv://udaysinghtohana9:shivbaba123@cluster0.vimqh.mongodb.net/noteapp?retryWrites=true&w=majority`;

// Check if mongoUrl is defined

const connectToMongoDB = ()=>{
  mongoose.connect(mongoUrl).then(()=>{console.log("Successfully Connected to MongoDB")});
}

module.exports = connectToMongoDB;