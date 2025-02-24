import Link from "next/link";
import { GetServerSideProps } from "next";

interface Book {
  id: number;
  title: string;
  author: string;
  quantity: number;
}

interface BookDetailProps {
  book: Book | null;
}

export default function BookDetail({ book }: BookDetailProps) {
  return (
    <div className="book-detail-container">
      {book ? (
        <>
          <h2>{book.title}</h2>
          <p><strong>저자:</strong> {book.author}</p>
          <p><strong>수량:</strong> {book.quantity}</p>
          <Link href="/booklist" className="back-button">← 돌아가기</Link>
        </>
      ) : (
        <p>책 정보를 찾을 수 없습니다.</p>
      )}
    </div>
  );
}

//서버에서 책 정보를 가져오는 함수 (SSR 적용)
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as { id: string };

  try {
    const res = await fetch("http://localhost:3000/api/books");
    const books: Book[] = await res.json();
    const book = books.find((b) => b.id === Number(id)) || null;

    return { props: { book } };
  } catch (error) {
    console.error("책 정보를 불러오는 데 실패했습니다:", error);
    return { props: { book: null } };
  }
};
