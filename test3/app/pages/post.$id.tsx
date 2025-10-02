import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router";
import type { AppDispatch, RootState } from "../redux/store";
import { fetchPostbyID, clearSelectedPost } from "../redux/postSlice";
import PostDetail from "../components/postDetail";

const PostDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { selectedPost, loading, error } = useSelector((state: RootState) => state.posts);

  useEffect(() => {
    if (id) {
      dispatch(fetchPostbyID(id));
    }
    
    return () => {
      dispatch(clearSelectedPost());
      return undefined; // Explicitly return undefined for cleanup
    };
  }, [dispatch, id]);

  return (
    <div className="p-4">
      <Link to="/" className="text-blue-600 hover:underline">
        ← Back to Posts
      </Link>
      {loading && <p className="mt-4">Loading...</p>}
      {error && <p className="mt-4 text-red-500">{error}</p>}
      {selectedPost && (
        <div className="mt-6">
          <PostDetail post={selectedPost} />
        </div>
      )}
    </div>
  );
};

export default PostDetailPage;
