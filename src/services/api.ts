import axios from "axios";

const API_URL = "http://localhost:5000/api/books";

// 책 목록을 가져오는 함수
export const getBooks = async () => {
  const response = await axios.get(API_URL);
  return response.data.books; 
};

// 책 추가하는 함수 (POST /api/books)
export const addBook = async (book: { title: string; author: string; quantity: number }) => {
  const response = await axios.post(API_URL, book);
  return response.data;
};

// 책 수정하는 함수 (PUT /api/books/:id)
export const updateBook = async (id: number, updatedBook: { quantity: number }) => {
  const response = await axios.put(`${API_URL}/${id}`, updatedBook);
  return response.data;
};

// 책 삭제하는 함수 (DELETE /api/books/:id)
export const deleteBook = async (id: number) => {
 await axios.delete(`${API_URL}/${id}`);
};


