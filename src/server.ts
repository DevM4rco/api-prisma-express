import express from 'express';
import { usersRoutes } from './routes/users.routes';

const app = express();

app.use(express.json());
app.use('/users', usersRoutes);

app.listen(3300, () => {
	console.log('Server is running on http://localhost:3300');
});
