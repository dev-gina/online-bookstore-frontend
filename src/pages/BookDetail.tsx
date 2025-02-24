import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getBooks } from "../services/api";
import "../App.css";

interface Book {
  id: number;
  title: string;
  author: string;
  quantity: number;
}

const BookDetail: React.FC = () => {
  const [book, setBook] = useState<Book | null>(null);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const books: Book[] = await getBooks();
        const bookId = id ? Number(id) : NaN;
        if (!isNaN(bookId)) {
          const foundBook = books.find((book) => book.id === bookId);
          setBook(foundBook || null);
        }
      } catch (error) {
        console.error("책 정보를 불러오는 데 실패했습니다.", error);
      }
    };
    fetchBook();
  }, [id]);

  return (
    <div className="book-detail-container">
      {book ? (
        <>
          <h2>{book.title}</h2>
          <p><strong>저자:</strong> {book.author}</p>
          <p><strong>수량:</strong> {book.quantity}</p>
          <Link to="/" className="back-button">← 돌아가기</Link>
        </>
      ) : (
        <p>책 정보를 찾을 수 없습니다.</p>
      )}
    </div>
  );
};

export default BookDetail;