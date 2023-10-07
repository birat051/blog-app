const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;
const routes=require('./routes')

app.use(cors());


// Database connection
mongoose.connect(process.env.MONGODB_URI, 
{
  dbName: process.env.DB_NAME,
  user: process.env.DB_USER,
  pass: process.env.DB_PASS,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


mongoose.connection.on('error', (error) => {
  console.error('Database connection error:', error);
});



mongoose.connection.once('open', () => {
  console.log('Connected to database');
});
app.use(bodyParser.json());
app.use('/v1', routes);
// Routes
// const blogRoutes = require('./src/routes/blogRoutes');
// app.use('/api/blogs', blogRoutes);
app.get('/', (req, res) => {
  res.send('Hello, Express!');
});


// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});