const express = require('express');
const connectDB = require('./config/db');
const notesRoutes = require('./routes/notes');
require('dotenv').config();
const cors = require('cors');

const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use('/api', notesRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
