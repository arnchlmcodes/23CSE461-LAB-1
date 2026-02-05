import express from 'express';
import cors from 'cors';
import activityRoutes from './routes/activities.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/activities', activityRoutes);

import generateRoutes from './routes/generate.js';
app.use('/api/generate-quiz', generateRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
