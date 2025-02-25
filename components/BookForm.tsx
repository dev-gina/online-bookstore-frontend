import { useState } from "react";

interface Book {
  title: string;
  author: string;
  quantity: number;
}

interface BookFormProps {
  onAddBook: (newBook: Book) => void;
}

const BookForm: React.FC<BookFormProps> = ({ onAddBook }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [quantity, setQuantity] = useState<number>(1);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!title || !author || quantity <= 0) {
      setError("모든 필드를 올바르게 입력해주세요.");
      return;
    }

    const newBook = { title, author, quantity };
    onAddBook(newBook);

    setTitle("");
    setAuthor("");
    setQuantity(1);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>새 책 추가</h2>
      <input type="text" placeholder="책 제목" value={title} onChange={(e) => setTitle(e.target.value)} required />
      <input type="text" placeholder="저자" value={author} onChange={(e) => setAuthor(e.target.value)} required />
      <input type="number" placeholder="수량" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} min="1" required />
      <button type="submit">추가</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
};

export default BookForm;
