const express = require("express"); // Importing the Express Framework/library
const connectToMongoDB = require('./database');
connectToMongoDB();

const app = express() // app as a Express Application 
const port = 3000
app.use(express.json()); // Middlewere to use body of Request //
// Available Routes //
app.get('/', (req, res) => {
  res.send('We are Live from Backend at SmartNoteVault, A lot of things are going on in my side !')
})

app.use('/api/auth', require('./routes/auth'));
// app.use('/api/notes', require('./routes/notes'));


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})