import React from 'react';

interface Book {
  id: number;
  nombre: string;
  anho: number;
  autor: string;
}

interface BookFilterProps {
  books: Book[];
  onFilterChange: (author: string) => void;
}

const BookFilter: React.FC<BookFilterProps> = ({ books, onFilterChange }) => {
  const uniqueAuthors = Array.from(new Set(books.map(book => book.autor)));

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="authorFilter" className="form-label">
              Filtrar por autor:
            </label>
            <select
              id="authorFilter"
              className="form-select"
              onChange={(e) => onFilterChange(e.target.value)}
            >
              <option value="">Todos los autores</option>
              {uniqueAuthors.map((author) => (
                <option key={author} value={author}>
                  {author}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookFilter; 