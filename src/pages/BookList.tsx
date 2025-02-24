import React, { useEffect, useState } from "react";
import { getBooks, deleteBook, updateBook } from "../services/api";
import BookForm from "../components/BookForm";
import { Link } from "react-router-dom";
import "../App.css";

interface Book {
  id: number;
  title: string;
  author: string;
  quantity: number;
}

const BookList: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState(""); 
  const [filterType, setFilterType] = useState("title"); 

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const data = await getBooks();
      setBooks(data);
    } catch (error) {
      console.error("책 목록을 불러오는 데 실패했습니다.", error);
    }
  };

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;

  // 📌 검색 기능 추가
  const filteredBooks = books.filter((book) =>
    filterType === "title"
      ? book.title.toLowerCase().includes(searchTerm.toLowerCase())
      : book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // 📌 삭제 기능
  const handleDelete = async (id: number) => {
    try {
      await deleteBook(id);
      alert("📚 책이 삭제되었습니다!");
      fetchBooks();
    } catch (error) {
      console.error("책 삭제 실패:", error);
    }
  };

  // 📌 수량 증가 기능
  const handleIncreaseQuantity = async (id: number, quantity: number) => {
    try {
      const updatedBook = { id, quantity: quantity + 1 };
      await updateBook(id, updatedBook);
      fetchBooks();
    } catch (error) {
      console.error("수량 증가 실패:", error);
    }
  };

  // 📌 수량 감소 기능 (0 이하로 감소 방지)
  const handleDecreaseQuantity = async (id: number, quantity: number) => {
    if (quantity > 0) {
      try {
        const updatedBook = { id, quantity: quantity - 1 };
        await updateBook(id, updatedBook);
        fetchBooks();
      } catch (error) {
        console.error("수량 감소 실패:", error);
      }
    }
  };

  return (
    <div className="container">
      <h1>📚 책 목록</h1>
      <BookForm onBookAdded={fetchBooks} />

      {/* 📌 검색 기능 추가 */}
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
                <Link to={`/books/${book.id}`}>{book.title}</Link> - {book.author} ({book.quantity}권)
              </span>
              <div className="book-actions">
                <button className="delete-button" onClick={() => handleDelete(book.id)}>삭제</button>
                <button className="increase-button" onClick={() => handleIncreaseQuantity(book.id, book.quantity)}>+1</button>
                <button className="decrease-button" onClick={() => handleDecreaseQuantity(book.id, book.quantity)}>-1</button>
              </div>
            </li>
          ))
        ) : (
          <p>책이 없습니다.</p>
        )}
      </ul>

      <div className="pagination">
        {Array.from({ length: Math.ceil(filteredBooks.length / booksPerPage) }, (_, index) => (
          <button key={index} onClick={() => paginate(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BookList;
