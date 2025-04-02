import express from 'express';
import cors from 'cors';
import albumRoutes from './routes/albums.js';

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());

app.use('/api/albums', albumRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the WNYU Archives');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
