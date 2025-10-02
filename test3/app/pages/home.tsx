import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostList from "../components/postList";
import type { RootState, AppDispatch } from "../redux/store";
import { fetchPosts } from "../redux/postSlice";
import type { Post } from "../types/types";

// Simple pagination component since we don't have the original one
const Pagination = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}: {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}) => {
  const totalPages = Math.ceil(total / perPage);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex justify-center mt-4 space-x-2">
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1 rounded ${
            currentPage === page
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 hover:bg-gray-300'
          }`}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

const HomePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { item, loading, error } = useSelector((state: RootState) => state.posts);
  const [page, setPage] = useState(1);
  const perPage = 10;

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  const start = (page - 1) * perPage;
  const visiblePosts = (Array.isArray(item) ? item : []).slice(start, start + perPage) as Post[];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Posts</h1>
      <PostList posts={visiblePosts} />
      <Pagination
        total={Array.isArray(item) ? item.length : 0}
        perPage={perPage}
        currentPage={page}
        onPageChange={setPage}
      />
    </div>
  );
};

export default HomePage;
