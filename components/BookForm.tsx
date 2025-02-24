import { useState } from "react";

const BookForm: React.FC = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [quantity, setQuantity] = useState<number>(1);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!title || !author || quantity <= 0) {
      setError("모든 필드를 올바르게 입력해주세요.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5001/api/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, author, quantity }),
      });

      if (!response.ok) {
        throw new Error("책 추가 실패");
      }

      alert("책이 추가되었습니다!");
      setTitle("");
      setAuthor("");
      setQuantity(1);

      window.location.reload();
    } catch (error) {
      console.error("책 추가 실패:", error);
      setError("책을 추가하는 데 실패했습니다.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>새 책 추가</h2>
      <input type="text" placeholder="책 제목" value={title} onChange={(e) => setTitle(e.target.value)} />
      <input type="text" placeholder="저자" value={author} onChange={(e) => setAuthor(e.target.value)} />
      <input type="number" placeholder="수량" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} />
      <button type="submit">추가</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
};

export default BookForm;