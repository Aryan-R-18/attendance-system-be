const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load env vars
dotenv.config();

// --- Database Connection ---
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

// Connect to Database
connectDB();

// --- Express App Initialization ---
const app = express();

// --- CORS Configuration ---
const corsOptions = {
  origin: "*",  // 👈 allow all origins temporarily
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));


// --- Body Parser ---
app.use(express.json({ extended: false }));

// --- Define API Routes ---
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/sections', require('./routes/sectionRoutes'));
app.use('/api/attendance', require('./routes/attendanceRoutes'));
app.use('/api/students', require('./routes/studentRoutes'));

// --- Root Route ---
app.get('/', (req, res) => res.send('Attendance API Running'));

// --- Server Listener (only used locally, not on Vercel) ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
