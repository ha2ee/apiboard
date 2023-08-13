import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import { HttpHeadersContext } from "../context/HttpHeadersProvider";


export default function PostUpdateForm({ closeUpdateModal, post }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { auth, setAuth } = useContext(AuthContext);
  const { headers, setHeaders } = useContext(HttpHeadersContext);

  const nav = useNavigate();

  const changeTitle = (event) => {
    setTitle(event.target.value);
  }

  const changeContent = (event) => {
    setContent(event.target.value);
  }

  useEffect(() => {
        setTitle(post.title);
        setContent(post.content);
  },[]);

  function updatePost(e) {
    e.preventDefault();
    if (!isLoading) {
      setIsLoading(true);
      fetch(`http://localhost:8080/board/${post.id}`, {
        method: 'PATCH',
        headers: headers,
        body: JSON.stringify({
          id: post.id,
          writer: auth,
          title: title,
          content: content,
        }),
      }).then((res) => {
        if (res.ok) {
          alert("수정이 완료 되었습니다.🎉");
          setIsLoading(false);
          closeUpdateModal();
          nav(0);
          return res.text();
        }
      }).catch((error) => {
          console.log("PostUpdateForm.js Error");
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
              <h5 className="modal-title">글수정</h5>
            </div>
            <div className="modal-body">
              <form onSubmit={updatePost}>
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
                    {isLoading ? "Saving..." : "수정"}
                  </button>
                </div>
              </form>
              <button type="button" className="btn btn-danger" onClick={closeUpdateModal}>닫기</button>
            </div>
          </div>
        </div>
    </>
  );
}