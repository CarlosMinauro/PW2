import React, { useState, useEffect } from 'react';
import BookList from '../components/BookList';
import BookFilter from '../components/BookFilter';

interface Book {
  id: number;
  nombre: string;
  anho: number;
  autor: string;
}

const API_URL = 'http://localhost:8080/api';

const LibrosPage: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [selectedAuthor, setSelectedAuthor] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/books`);
      if (!response.ok) {
        throw new Error('Error al cargar los libros');
      }
      const data = await response.json();
      setBooks(data);
      setFilteredBooks(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = async (author: string) => {
    setSelectedAuthor(author);
    try {
      setLoading(true);
      const url = author 
        ? `${API_URL}/books/filter?autor=${encodeURIComponent(author)}`
        : `${API_URL}/books`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Error al filtrar los libros');
      }
      const data = await response.json();
      setFilteredBooks(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container py-4">
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-4">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <h1 className="text-center mb-4">Catálogo de Libros</h1>
      <BookFilter books={books} onFilterChange={handleFilterChange} />
      <BookList books={filteredBooks} />
    </div>
  );
};

export default LibrosPage; 