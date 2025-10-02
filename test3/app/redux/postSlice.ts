import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import type { Post, Comment } from "../types/types";

interface PostWithComments extends Post {
  Comments: Comment[];
}

interface PostsState {
  item: Post[] | PostWithComments[];
  selectedPost: PostWithComments | null;
  loading: boolean;
  error: string | null;
}

const initialState: PostsState = {
  item: [],
  selectedPost: null,
  loading: false,
  error: null,
};

export const fetchPosts = createAsyncThunk("post/fetchpost", async () => {
  const response = await axios.get<Post[]>("https://jsonplaceholder.typicode.com/posts");
  return response.data;
});

export const fetchPostbyID = createAsyncThunk("post/fetchpostbyid", async (id: string) => {
  const [postRes, commentRes] = await Promise.all([
    axios.get<Post>(`https://jsonplaceholder.typicode.com/posts/${id}`),
    axios.get<Comment[]>(`https://jsonplaceholder.typicode.com/posts/${id}/comments`),
  ]);
  
  return {
    ...postRes.data,
    Comments: commentRes.data,
  } as PostWithComments;
});

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    clearSelectedPost: (state) => {
      state.selectedPost = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
        state.loading = false;
        state.item = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Failed to fetch posts';
      })
      .addCase(fetchPostbyID.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPostbyID.fulfilled, (state, action: PayloadAction<PostWithComments>) => {
        state.loading = false;
        state.selectedPost = action.payload;
      })
      .addCase(fetchPostbyID.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Failed to fetch post';
      });
  },
});

export const { clearSelectedPost } = postSlice.actions;
export default postSlice.reducer;