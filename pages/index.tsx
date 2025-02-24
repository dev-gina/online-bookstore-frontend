import Link from "next/link";

export default function Home() {
  return (
    <div className="container">
      <h1>😎 진아의 온라인 서점 📖</h1>
      <Link href="/booklist">
        <button className="add-button">📖 책 목록 보기</button>
      </Link>
    </div>
  );
}
