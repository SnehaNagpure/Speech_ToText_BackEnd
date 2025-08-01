const express = require('express');
const dotenv = require('dotenv');
dotenv.config(); 
const app = express();
const connectDB = require('./config/db'); 
const userRoutes = require('./routes/userRoutes');
const audioRoutes = require('./routes/audioRoutes');
app.use(express.json());
const cors = require("cors");
// app.use(cors({
//   origin: "http://localhost:5173", // ✅ Your React app's URL
//   credentials: true,
// }));

app.use(cors({

  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

// Connect to MongoDB
connectDB();
//nsole.log('OPENAI_API_KEY:', process.env.OPENAI_API_KEY);
app.use('/uploads', express.static('uploads'));
app.use('/api/users', userRoutes);
app.use('/api/audios', audioRoutes);
app.get('/', (req, res) => {
  res.send('🎙️ Speech-to-Text Backend is running!');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});