import React from 'react';

interface Book {
  id: number;
  nombre: string;
  anho: number;
  autor: string;
}

interface BookListProps {
  books: Book[];
}

const BookList: React.FC<BookListProps> = ({ books }) => {
  if (books.length === 0) {
    return (
      <div className="alert alert-info text-center m-4" role="alert">
        No se encontraron libros para este autor.
      </div>
    );
  }

  return (
    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 p-4">
      {books.map((book) => (
        <div key={book.id} className="col">
          <div className="card h-100 shadow-sm">
            <div className="card-body">
              <h5 className="card-title">{book.nombre}</h5>
              <p className="card-text text-muted">Autor: {book.autor}</p>
              <p className="card-text text-muted">Año: {book.anho}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookList; 