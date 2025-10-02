import React from "react";
import type { Post, Comment } from "../types/types";

interface PostWithComments extends Post {
  Comments: Comment[];
}

interface PostDetailProps {
  post: PostWithComments;
}

const PostDetail: React.FC<PostDetailProps> = ({ post }) => {
  if (!post) return <p className="text-gray-600">No post selected</p>;
  
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
      <div className="flex items-center mb-6">
        <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-semibold text-lg">
          {post.userId}
        </div>
        <div className="ml-4">
          <div className="font-medium text-gray-900">User {post.userId}</div>
          <div className="text-sm text-gray-500">Post #{post.id}</div>
        </div>
      </div>
      
      <h1 className="text-3xl font-bold text-gray-900 mb-4">{post.title}</h1>
      <div className="prose max-w-none text-gray-700 mb-8">
        <p className="text-lg leading-relaxed">{post.body}</p>
      </div>
      
      {post.Comments && post.Comments.length > 0 && (
        <div className="mt-10">
          <div className="flex items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">Comments</h2>
            <span className="ml-3 px-3 py-1 bg-indigo-100 text-indigo-800 text-sm font-medium rounded-full">
              {post.Comments.length}
            </span>
          </div>
          
          <ul className="space-y-6">
            {post.Comments.map((comment) => (
              <li key={comment.id} className="bg-gray-50 p-5 rounded-lg">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 font-medium">
                    {comment.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="ml-3">
                    <div className="font-medium text-gray-900">{comment.name}</div>
                    <div className="text-sm text-gray-500">{comment.email}</div>
                  </div>
                </div>
                <p className="text-gray-700 pl-13">{comment.body}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PostDetail;
