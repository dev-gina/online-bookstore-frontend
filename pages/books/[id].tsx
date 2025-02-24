import { GetServerSideProps } from "next";
import React from "react";

interface Book {
  id: number;
  title: string;
  author: string;
  quantity: number;
}

interface BookDetailProps {
  book: Book;
}

const BookDetail: React.FC<BookDetailProps> = ({ book }) => {
  return (
    <div className="container">
      <h1>{book.title}</h1>
      <p>저자: {book.author}</p>
      <p>수량: {book.quantity}권</p>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params!;
  const res = await fetch(`http://127.0.0.1:5001/api/books/${id}`);
  if (!res.ok) {
    return { notFound: true };
  }
  const book: Book = await res.json();
  return { props: { book } };
};

export default BookDetail;
