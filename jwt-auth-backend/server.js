// server.js
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.js';

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

// Endpoint utama
app.get('/', (req, res) => {
  res.send(`Backend berjalan di port ${PORT}`);
});

// Endpoint test ping
app.get('/ping', (req, res) => {
  res.json({ success: true, message: 'Backend OK' });
});

app.use('/auth', authRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
