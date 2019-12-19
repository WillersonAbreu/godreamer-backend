import app from './app';
import dotenv from 'dotenv';

dotenv.config();

console.log(`Your application is running on port ${process.env.PORT}`);
app.listen(process.env.PORT);
