import express from 'express';
import cors from 'cors';
import { getAllBooks, getBooksByAuthor } from './controllers/bookController';

const app = express();
const port = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/api/books', getAllBooks);
app.get('/api/books/filter', getBooksByAuthor);

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 