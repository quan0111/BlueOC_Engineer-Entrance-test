import React from "react";
import { Link } from "react-router";
import type { Post } from "../types/types";

interface PostItemProps {
  post: Post;
}

const PostItem: React.FC<PostItemProps> = ({ post }) => (
  <div className="card overflow-hidden h-full flex flex-col transition-all duration-300 hover:-translate-y-1">
    <Link to={`/post/${post.id}`} className="block p-6 h-full">
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-semibold">
          {post.userId}
        </div>
        <div className="ml-3 text-sm text-gray-500">
          User {post.userId}
        </div>
      </div>
      <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">{post.title}</h2>
      <p className="text-gray-600 line-clamp-3">{post.body}</p>
      <div className="mt-4 pt-4 border-t border-gray-100">
        <span className="inline-flex items-center text-sm text-indigo-600 font-medium">
          Read more →
        </span>
      </div>
    </Link>
  </div>
);

export default PostItem;