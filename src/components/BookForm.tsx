import React, { useState } from "react";
import { addBook } from "../services/api";

interface Props {
  onBookAdded: () => void; 
}

const BookForm: React.FC<Props> = ({ onBookAdded }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [quantity, setQuantity] = useState<number>(1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !author || quantity <= 0) {
      alert("모든 필드를 올바르게 입력해주세요.");
      return;
    }

    try {
      await addBook({ title, author, quantity });
      alert("📚 책이 추가되었습니다!");
      setTitle("");
      setAuthor("");
      setQuantity(1);
      onBookAdded(); 
    } catch (error) {
      console.error("책 추가 실패:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>📖 새 책 추가</h2>
      <input
        type="text"
        placeholder="책 제목"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="저자"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />
      <input
        type="number"
        placeholder="수량"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      />
      <button type="submit">추가</button>
    </form>
  );
};

export default BookForm;
