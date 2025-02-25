import { useState, useEffect } from "react";
import Link from "next/link";
import { GetServerSideProps } from "next";
import BookForm from "@/components/BookForm";

interface Book {
  id: number;
  title: string;
  author: string;
  quantity: number;
}

interface BookListProps {
  books: Book[];
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://gina-backend-098d63d3c03d.herokuapp.com"; // ✅ 환경 변수 적용

const BookList: React.FC<BookListProps> = ({ books }) => {
  const [bookList, setBookList] = useState<Book[]>(books || []);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [booksPerPage] = useState<number>(10);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterType, setFilterType] = useState<string>("title");

  const filteredBooks = (bookList || []).filter((book) =>
    filterType === "title"
      ? book.title.toLowerCase().includes(searchTerm.toLowerCase())
      : book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages || 1);
    }
  }, [filteredBooks.length, booksPerPage]);

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleAddBook = async (newBook: Omit<Book, "id">) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/books`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBook),
      });

      const addedBook: Book = await response.json();
      setBookList((prevBooks) => [addedBook, ...prevBooks]);
    } catch (error) {
      console.error("책 추가 오류:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/books/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("책 삭제 실패");
      }
      setBookList((prevBooks) => prevBooks.filter((book) => book.id !== id));
    } catch (error) {
      console.error("책 삭제 오류:", error);
    }
  };

  const handleIncreaseQuantity = async (id: number, quantity: number) => {
    try {
      await fetch(`${API_BASE_URL}/api/books/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity: quantity + 1 }),
      });
      setBookList((prevBooks) =>
        prevBooks.map((book) =>
          book.id === id ? { ...book, quantity: book.quantity + 1 } : book
        )
      );
    } catch (error) {
      console.error("수량 증가 오류:", error);
    }
  };

  const handleDecreaseQuantity = async (id: number, quantity: number) => {
    if (quantity > 0) {
      try {
        await fetch(`${API_BASE_URL}/api/books/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ quantity: quantity - 1 }),
        });
        setBookList((prevBooks) =>
          prevBooks.map((book) =>
            book.id === id ? { ...book, quantity: book.quantity - 1 } : book
          )
        );
      } catch (error) {
        console.error("수량 감소 오류:", error);
      }
    }
  };

  return (
    <div className="container">
      <h1>책 목록</h1>
      <BookForm onAddBook={handleAddBook} />

      <div className="search-container">
        <input
          type="text"
          placeholder={`검색어 입력 (${filterType === "title" ? "제목" : "저자"})`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select onChange={(e) => setFilterType(e.target.value)} value={filterType}>
          <option value="title">제목</option>
          <option value="author">저자</option>
        </select>
      </div>

      <ul className="book-list">
        {currentBooks.length > 0 ? (
          currentBooks.map((book) => (
            <li key={book.id} className="book-item">
              <span className="book-info">
                <Link href={`/books/${book.id}`}>{book.title}</Link> - {book.author} ({book.quantity}권)
              </span>
              <div className="book-actions">
                <button onClick={() => handleDelete(book.id)}>삭제</button>
                <button onClick={() => handleIncreaseQuantity(book.id, book.quantity)}>+1</button>
                <button onClick={() => handleDecreaseQuantity(book.id, book.quantity)}>-1</button>
              </div>
            </li>
          ))
        ) : (
          <p>책이 없습니다.</p>
        )}
      </ul>

      <div className="pagination">
        <button
          className="previous-button"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          이전
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={`pagination-button page-number ${currentPage === index + 1 ? "active" : ""}`}
            onClick={() => paginate(index + 1)}
          >
            {index + 1}
          </button>
        ))}
        <button
          className="next-button"
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          다음
        </button>
      </div>
    </div>
  );
};

export default BookList;

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/api/books`);
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    const books: Book[] = await res.json();
    return { props: { books } };
  } catch (error) {
    console.error("책 목록을 불러오는 데 실패했습니다:", error);
    return { props: { books: [] } };
  }
};
