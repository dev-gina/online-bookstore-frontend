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
  if (!book) {
    return <div>책 정보를 불러올 수 없습니다.</div>;
  }

  return (
    <div className="container">
      <h1>{book.title}</h1>
      <p>저자: {book.author}</p>
      <p>수량: {book.quantity}권</p>
    </div>
  );
};

export default BookDetail; 

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params ?? {}; 

  if (!id) {
    return { notFound: true };
  }

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:5001";
  
  try {
    const res = await fetch(`${API_BASE_URL}/api/books/${id}`);

    if (!res.ok) {
      return { notFound: true };
    }

    const book: Book = await res.json();
    return { props: { book } };
  } catch (error) {
    console.error("데이터 가져오기 오류:", error);
    return { notFound: true };
  }
};
