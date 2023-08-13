import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import { HttpHeadersContext } from "../context/HttpHeadersProvider";
import { useNavigate } from "react-router-dom";

export default function PostCreateForm({ closeModal }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { auth, setAuth } = useContext(AuthContext);
  const { headers, setHeaders } = useContext(HttpHeadersContext);

  // const headers = {
  //   "Content-Type": "application/json",
  //   "Authorization" :`Bearer ${localStorage.getItem("board_access_token")}`
  // };

  const nav = useNavigate();

  const changeTitle = (event) => {
    setTitle(event.target.value);
  }

  const changeContent = (event) => {
    setContent(event.target.value);
  }

  useEffect(() => {
    if (!auth) {
      alert("로그인 한 사용자만 게시글을 작성 할 수 있습니다.");
      closeModal();
    }
  }, []);

  const createPost = (e) => {
    e.preventDefault();
    if (!isLoading) {
      setIsLoading(true);
      fetch(`http://localhost:8080/board`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
          writer: localStorage.getItem("id"),
          title: title,
          content: content,
        }),
      }).then((res) => {
        if (res.ok) {
          alert("저장이 완료 되었습니다.🎉");
          nav(0);
          setIsLoading(false);
        }
      }).catch((error) => {
        console.log("PostCreateForm.js Error ...");
        console.log(error);
        setIsLoading(false);
      });
    }
  }

  return (
    <>
      <div className="custom-modal">
        <div className="custom-modal-content">
          <div className="modal-header">
            <h5 className="modal-title">글작성</h5>
            <button type="button" className="btn-close" onClick={closeModal}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={createPost}>
              <div className="mb-3">
                <label htmlFor="title" className="form-label">제목</label>
                <input
                  type="text"
                  className="form-control"
                  value={title}
                  onChange={changeTitle}
                  required
                />
                <div className="invalid-feedback">제목을 입력해주세요.</div>
              </div>

              <div className="mb-3">
                <label htmlFor="content" className="form-label">내용</label>
                <textarea
                  className="form-control"
                  rows={8}
                  value={content}
                  onChange={changeContent}
                  required
                />
                <div className="invalid-feedback">내용을 입력해주세요.</div>
              </div>

              <div className="d-flex justify-content-end">
                <button type="submit" className="btn btn-primary" style={{ opacity: isLoading ? 0.7 : 1 }}>
                  {isLoading ? "Saving..." : "저장"}
                </button>
              </div>
            </form>
            <button type="button" className="btn btn-danger" onClick={closeModal}>닫기</button>
          </div>
        </div>
      </div>
    </>
  );
}