import { Request, Response } from 'express';
import { books } from '../data/books';

export const getAllBooks = (req: Request, res: Response): void => {
  res.json(books);
};

export const getBooksByAuthor = (req: Request, res: Response): void => {
  const { autor } = req.query;
  
  if (!autor) {
    res.json(books);
    return;
  }

  const filteredBooks = books.filter(book => 
    book.autor.toLowerCase() === (autor as string).toLowerCase()
  );

  res.json(filteredBooks);
}; 