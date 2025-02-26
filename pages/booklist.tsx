import { useState, useEffect } from "react";
import Link from "next/link";
import BookForm from "@/components/BookForm";

interface Book {
  id: number;
  title: string;
  author: string;
  quantity: number;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5001";

const BookList: React.FC = () => {
  const [bookList, setBookList] = useState<Book[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [booksPerPage] = useState<number>(10);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterType, setFilterType] = useState<string>("title");

  // 페이지네이션 관련 코드
  const totalPages = Math.ceil(bookList.length / booksPerPage);
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = bookList.slice(indexOfFirstBook, indexOfLastBook);

  // 책 목록 불러오기
  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch(`${API_BASE_URL}/api/books`);
      const books = await response.json();
      setBookList(books);
    };
    fetchBooks();
  }, []);

  // 책 삭제
  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/books/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("책 삭제 실패");

      setBookList((prevBooks) => prevBooks.filter((book) => book.id !== id));
    } catch (error) {
      console.error("책 삭제 오류:", error);
    }
  };

  // 수량 증가/감소
  const handleQuantityChange = async (id: number, action: "increase" | "decrease") => {
    const updatedBookList = [...bookList];
    const book = updatedBookList.find((b) => b.id === id);
    if (book) {
      if (action === "increase") {
        book.quantity += 1;
      } else if (action === "decrease" && book.quantity > 0) {
        book.quantity -= 1;
      }

      try {
        const response = await fetch(`${API_BASE_URL}/api/books/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ quantity: book.quantity }),
        });

        if (!response.ok) throw new Error("수량 변경 실패");

        setBookList(updatedBookList);
      } catch (error) {
        console.error("수량 수정 오류:", error);
      }
    }
  };

  // 책 추가
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

  return (
    <div className="book-container">
      <h1>책 목록</h1>

      {/* 책 추가 폼 */}
      <BookForm onAddBook={handleAddBook} />

      {/* 검색 입력 */}
      <div className="search-container">
        <input
          className="search-input"
          type="text"
          placeholder={`검색어 입력 (${filterType === "title" ? "제목" : "저자"})`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="filter-select"
          onChange={(e) => setFilterType(e.target.value)}
          value={filterType}
        >
          <option value="title">제목</option>
          <option value="author">저자</option>
        </select>
      </div>

      <ul className="book-list">
        {/* 책 목록을 검색어에 맞게 필터링 */}
        {currentBooks
          .filter((book) =>
            filterType === "title"
              ? book.title.toLowerCase().includes(searchTerm.toLowerCase())
              : book.author.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((book) => (
            <li key={book.id} className="book-item">
              <div className="book-info">
                <Link href={`/books/${book.id}`}>{book.title}</Link> - {book.author}
              </div>
              <div className="book-actions">
                <button
                  className="action-button delete-button"
                  onClick={() => handleDelete(book.id)}
                >
                  삭제
                </button>
                <button
                  className="action-button increase-button"
                  onClick={() => handleQuantityChange(book.id, "increase")}
                >
                  +
                </button>
                <span>{book.quantity}</span>
                <button
                  className="action-button decrease-button"
                  onClick={() => handleQuantityChange(book.id, "decrease")}
                >
                  -
                </button>
              </div>
            </li>
          ))}
      </ul>

      {/* 페이지네이션 (필터링된 책 목록에 적용) */}
      <div className="pagination">
        <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
          이전
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => paginate(index + 1)}
            disabled={currentPage === index + 1}
          >
            {index + 1}
          </button>
        ))}
        <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages}>
          다음
        </button>
      </div>
    </div>
  );
};

export default BookList;
