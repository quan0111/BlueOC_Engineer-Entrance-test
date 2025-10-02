// routes.tsx
export default [
  {
    path: "/",
    file: "./pages/home.tsx", // Đường dẫn tới file component
  },
  {
    path: "/post/:id",
    file: "./pages/post.$id.tsx", // Sửa tên file cho đúng
  },
];