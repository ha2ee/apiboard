import { Route, Routes } from "react-router-dom";
import Main from "../app/Main";
import LoginForm from "../member/LoginForm";
import SignupForm from "../member/SignUpForm";
import PostDetail from "../post/PostDetail";
import PostList from "../post/PostList";
import Logout from "../member/Logout";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/board" element={<PostList />} />
      <Route path="/board/:postId" element={<PostDetail />} />

      <Route path="/join" element={<SignupForm />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/logout" element={<Logout />} />

    </Routes>
  );
}