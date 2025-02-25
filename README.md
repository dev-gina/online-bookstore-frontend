### 프론트엔드 - 이진아

1. 앱에 대한 설명
- 주요 역할 : 사용자에게 책 목록, 검색, 페이지네이션, 책 추가/수정/삭제 UI를 제공
- 기술 스택 : Next.js, TypeScript, React Hooks
- 주요 기능
  ① 책 목록 표시 및 페이지네이션 (한 페이지당 10개)
  ② 책 검색(제목/저자) 기능
  ③ 책 추가 / 수정 / 삭제 기능
  ④ 백엔드 연동


-----------------------------------------------------------------------


2. 소스 빌드 및 실행 방법
C:\web_gina\rgt-frontend-test\online-bookstore-frontend>
npm install
npm run dev
http://localhost:3000


-----------------------------------------------------------------------


3. 주력으로 사용한 컴포넌트 설명 및 이유
① pages/BookList.tsx
책 목록과 페이지네이션을 담당하는 핵심 컴포넌트
useState, useEffect 등 React Hooks를 사용하여 상태 관리 진행
이유: Next.js의 페이지 구조를 활용하여 라우팅 및 SSR을 쉽게 구현하기 위해 사용

② components/BookForm.tsx
책 추가 폼을 모듈화하여 재사용 가능하도록 분리
이유: UI/로직 분리로 코드 가독성과 유지보수성 향상
기타: 검색 바(SearchBar), 페이지네이션(Pagination) 등 UI 컴포넌트를 분리하여 사용하면 가독성과 유지보수에 유리


-----------------------------------------------------------------------


4. 백엔드 연결 여부
- 완료 : 백엔드 API(http://127.0.0.1:5001/api/books)와 연동하여 CRUD 기능 구현



